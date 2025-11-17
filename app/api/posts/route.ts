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

async function generateUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let counter = 1;

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

    const baseSlug = slugify(data.title);

    if (!baseSlug) {
      return NextResponse.json(
        { error: 'Invalid title for slug creation' },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(baseSlug);

    const createdPost = await Post.create({
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.imageUrl,
      buttons: data.buttons || [],
      cards: data.cards || [],
      problems: data.problems || [],
      promises: data.promises || [],
      enrollLink: data.enrollLink || "#",
      offer: data.offer || {},
      experience: data.experience || {},
      whySection: data.whySection || {},
      whoSection: data.whoSection || {},
      includedSection: data.includedSection || {},
      stickyCTA: data.stickyCTA || {},
      slug,
      visible: true,
    });

    return NextResponse.json(createdPost);
  } catch (err: any) {
    console.error("❌ POST /api/posts error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
