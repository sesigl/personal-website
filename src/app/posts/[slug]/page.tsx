import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/partials/mdx/mdx";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetPosts from "@/partials/WidgetPosts";
import PostDate from "@/partials/post-date";
import configuration from "@/configuration";
import ShareButtons from "@/app/posts/[slug]/ShareButtons";
import BackButton from "@/partials/BackButton";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) return;

  const { title, summary: description, image } = post;

  return {
    title,
    description,
    authors: {
      name: "Sebastian Sigl",
    },
    openGraph: {
      title,
      description,
      images: [image],
    },

    twitter: {
      title,
      description,
      images: [image],
      card: "summary_large_image",
      creator: "@sesigl",
      site: "@sesigl",
    },
  };
}

export default async function SinglePost({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) notFound();

  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
      {/* Middle area */}
      <div className="grow">
        <div className="max-w-[700px]">
          {/* Back */}
          <BackButton />

          <article>
            {/* Post header */}
            <header>
              <div className="flex items-center justify-between mb-1">
                {/* Post date */}
                <div className="text-xs text-slate-500 uppercase">
                  <span className="text-sky-500">—</span>{" "}
                  <PostDate dateString={post.publishedAt} />{" "}
                  <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
                  10 Min read
                </div>
                <ShareButtons
                  url={`${configuration.baseUrl}/posts/${post.slug}`}
                  title={post.title}
                  summary={post.summary}
                />
              </div>
              <h1 className="h1 font-aspekta mb-4">{post.title}</h1>
            </header>
            <Mdx code={post.body.code} />
          </article>
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="md:w-[240px] lg:w-[300px] shrink-0">
        <div className="space-y-6">
          <WidgetNewsletter />
          <WidgetPosts excludedPostIds={[post._id]} />
        </div>
      </aside>
    </div>
  );
}
