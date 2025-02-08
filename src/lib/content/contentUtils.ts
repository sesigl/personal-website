import { getEntry } from "astro:content";

export async function getPostBySlug(slug: string) {
  const post = await getEntry("blog", slug);
  if (!post) throw new Error(`Post with slug "${slug}" not found`);
  return {
    title: post.data.title,
    content: post.body,
    date: post.data.pubDate,
  };
}