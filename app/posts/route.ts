import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/post';

function slugify(text: string) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

// Generate unique slug
async function generateUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let counter = 1;

  // Keep checking until you find a slug that doesn't exist
  while (await Post.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const data = await req.json();

    if (!data.title || !data.subtitle || !data.imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create base slug from title
    const baseSlug = slugify(data.title);

    if (!baseSlug) {
      return NextResponse.json(
        { error: 'Invalid title for slug creation' },
        { status: 400 }
      );
    }

// Ensure slug is unique
const slug = await generateUniqueSlug(baseSlug);

// Create post
const createdPost = await Post.create({
  title: data.title,
  subtitle: data.subtitle,
  imageUrl: data.imageUrl,
  buttons: data.buttons || [],
  cards: data.cards || [],
  problems: data.problems || [],
  promises: data.promises || [],
  enrollLink: data.enrollLink || '#',
  
    offer: data.offer || {}, 

  experience: data.experience || {},

  whySection: {
  title: data.whySection?.title || "",
  items: Array.isArray(data.whySection?.items)
    ? data.whySection.items
    : [],
},

whoSection: data.whoSection || {},

includedSection: data.includedSection || {},

stickyCTA: data.stickyCTA || {},


  slug,
  visible: true,
});

    return NextResponse.json(createdPost);

  } catch (err: any) {
    console.error('API /api/posts POST error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}