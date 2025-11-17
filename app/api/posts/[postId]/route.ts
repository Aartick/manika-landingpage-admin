import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/post';

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

  const updated = await Post.findByIdAndUpdate(
    postId,
    {
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.imageUrl,
      buttons: data.buttons,
      cards: data.cards || [],
      problems: data.problems || [],
      promises: data.promises || [],
enrollLink: data.enrollLink || '#',
    offer: data.offer, 
          experience: data.experience,

          whySection: {
          title: data.whySection?.title || "",
          items: Array.isArray(data.whySection?.items)
            ? data.whySection.items
            : [],
        },

        whoSection: data.whoSection || {},

        includedSection: data.includedSection || {},

        stickyCTA: data.stickyCTA,




    },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

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
