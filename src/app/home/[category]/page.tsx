import React from "react";
import Hero from "@/partials/Hero";
import ArticlesList from "@/partials/ArticlesList";
import Talks from "@/partials/Talks";
import Projects from "@/partials/Projects";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";
import WidgetBook from "@/partials/WidgetBook";
import ArticleCategory from "@/lib/domain/article/ArticleType";

function HomeCategoryPage({
  params,
}: {
  params: { category: ArticleCategory };
}) {
  return (
    <>
      <Hero />

      {/* Content */}
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pb-16 md:pb-20">
        {/* Middle area */}
        <div className="grow">
          <div className="max-w-[700px]">
            <div className="space-y-10">
              <ArticlesList category={params.category} />
              <Talks />
              <Projects />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">
            <WidgetNewsletter />
            <WidgetSponsor />
            <WidgetBook />
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomeCategoryPage;
