import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/post';
import { slugify } from "@/lib/slugify";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  console.log("🔥 GET /api/posts/", postId);

  await dbConnect();

  const post = await Post.findById(postId);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> } // <-- type
) {

  const { postId } = await context.params; // <-- await

  await dbConnect();

  const data = await req.json();

  const existing = await Post.findById(postId);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

if (!data.slug || data.slug.trim() === "") {
  return NextResponse.json({ error: "Slug is required" }, { status: 400 });
}

const cleanSlug = slugify(data.slug);

// Check duplicate slug except current post
const exists = await Post.findOne({ slug: cleanSlug, _id: { $ne: postId } });
if (exists) {
  return NextResponse.json(
    { error: "Slug already in use. Choose a different one." },
    { status: 400 }
  );
}


  const updated = await Post.findByIdAndUpdate(
    postId,
    {
      ...data,
slug: cleanSlug
    },
    { new: true }
  );

  return NextResponse.json(updated);
}


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  await dbConnect();
  const deleted = await Post.findByIdAndDelete(postId);

  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ success: true });
}
