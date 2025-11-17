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
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  await dbConnect();

  const data = await req.json();

  const existing = await Post.findById(postId);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 🔥 Automatically generate updated slug from title
  const newSlug = slugify(data.title);

  const updated = await Post.findByIdAndUpdate(
    postId,
    {
      ...data,
      slug: newSlug, // 🔥 Always update slug when title changes
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
