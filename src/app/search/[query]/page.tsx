import React from "react";
import WidgetBook from "@/partials/WidgetBook";
import PostItem from "@/app/home/[category]/post-item";
import ArticleRepository from "@/lib/domain/article/ArticleRepository";
import BackButton from "@/partials/BackButton";

let inMemoryArticleRepository = new ArticleRepository();

function SearchPage({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: Record<string, string>;
}) {
  const isCategoryOnly =
    Object.keys(searchParams).indexOf("categoryOnly") !== -1;

  const searchResulPosts = inMemoryArticleRepository.findPostByQuery(
    params.query,
    isCategoryOnly
  );

  return (
    <>
      {/* Content */}
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
        {/* Middle area */}
        <div className="grow">
          <div className="max-w-[700px]">
            <BackButton />

            <div className="space-y-10">
              <section>
                <h2 className="font-aspekta text-xl font-[650] mb-3">
                  {isCategoryOnly ? (
                    <>Search results for Category &quot;{params.query}&quot;</>
                  ) : (
                    <>Search results for &quot;{params.query}&quot;</>
                  )}
                </h2>
                {searchResulPosts.map((post) => (
                  <PostItem key={post._id} {...post} showTags={true} />
                ))}
              </section>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">
            <WidgetBook />
          </div>
        </aside>
      </div>
    </>
  );
}

export default SearchPage;
