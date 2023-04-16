import React from "react";

import ArticleItem from "../partials/ArticleItem";
import FilterItem from "@/app/home/[category]/FilterItem";
import ArticleCategory from "@/lib/domain/article/ArticleType";
import ArticleRepository from "@/lib/domain/article/ArticleRepository";

function ArticlesList({ category }: { category: ArticleCategory }) {
  let inMemoryArticleRepository = new ArticleRepository();
  const items = inMemoryArticleRepository.findAll();
  const filteredItems = items.filter((i) => i.category === category);

  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-3">Latest Articles</h2>

      {/* Filters */}
      <ul className="flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800">
        <FilterItem value="Backend" active={category === "Backend"} />
        <FilterItem value="DevOps" active={category === "DevOps"} />
        <FilterItem
          value="Machine-Learning"
          active={category === "Machine-Learning"}
        />
      </ul>

      {/* Articles list */}
      <div>
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
