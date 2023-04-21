import Link from "next/link";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/partials/mdx/mdx";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";
import WidgetPosts from "@/partials/WidgetPosts";
import PostDate from "@/partials/post-date";
import configuration from "@/configuration";
import ShareButtons from "@/app/posts/[slug]/ShareButtons";

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

  const { title, summary: description } = post;

  return {
    title,
    description,
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
          <div className="mb-3">
            <Link
              className="inline-flex text-sky-500 rounded-full border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30"
              href="/"
            >
              <span className="sr-only">Back</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
                <path
                  className="fill-current"
                  d="m16.414 17 3.293 3.293-1.414 1.414L13.586 17l4.707-4.707 1.414 1.414z"
                />
              </svg>
            </Link>
          </div>

          <article>
            {/* Post header */}
            <header>
              <div className="flex items-center justify-between mb-1">
                {/* Post date */}
                <div className="text-xs text-slate-500 uppercase">
                  <span className="text-sky-500">—</span>{" "}
                  <PostDate dateString={post.publishedAt} />{" "}
                  <span className="text-slate-400 dark:text-slate-600">·</span>{" "}
                  4 Min read
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
          <WidgetSponsor />
          <WidgetPosts />
        </div>
      </aside>
    </div>
  );
}
