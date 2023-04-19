import React from "react";

import ArticleItem from "../partials/ArticleItem";
import FilterItem from "@/app/home/[category]/FilterItem";
import ArticleCategory from "@/lib/domain/article/ArticleType";
import ArticleRepository from "@/lib/domain/article/ArticleRepository";
import PostItem from "@/app/home/[category]/post-item";

function ArticlesList({ category }: { category: ArticleCategory }) {
  let inMemoryArticleRepository = new ArticleRepository();
  const items = inMemoryArticleRepository.findExternalArticles();
  const filteredItems =
    category === "All" ? items : items.filter((i) => i.category === category);

  const posts = inMemoryArticleRepository.findPosts();
  const filteredPosts =
    category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-3">Latest Articles</h2>

      {/* Filters */}
      <ul className="flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800">
        <FilterItem value="All" active={category === "All"} />
        <FilterItem value="Tech" active={category === "Tech"} />
        <FilterItem value="Leadership" active={category === "Leadership"} />
      </ul>

      {/* Articles list */}
      <div>
        {filteredPosts.map((post, postIndex) => (
          <PostItem key={postIndex} {...post} />
        ))}
        {filteredItems.map((item) => {
          return (
            <ArticleItem
              key={item.id}
              title={item.title}
              slug={item.slug}
              image={item.image}
              date={item.date}
              excerpt={item.excerpt}
              link={item.link}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ArticlesList;
