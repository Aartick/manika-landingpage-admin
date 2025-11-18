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

    // 🔥 1. Validate required fields
    if (!data.title || !data.subtitle || !data.videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isValidYoutubeUrl = (url: string) => /(youtube\.com|youtu\.be)/.test(url);

if (!isValidYoutubeUrl(data.videoUrl)) {
  return NextResponse.json({ error: "Invalid YouTube video URL" }, { status: 400 });
}


    // 🔥 2. Validate slug
    if (!data.slug || data.slug.trim() === "") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // 🔥 3. Clean slug
   const cleanedSlug = slugify(data.slug);


    // 🔥 4. Check uniqueness
    const exists = await Post.findOne({ slug: cleanedSlug });
    if (exists) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    // 🔥 5. Create post with ADMIN slug
    const createdPost = await Post.create({
      title: data.title,
      subtitle: data.subtitle,
      videoUrl: data.videoUrl,
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
      slug: cleanedSlug,
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
