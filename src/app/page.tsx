import React from "react";

import SideNavigation from "@/partials/SideNavigation";
import Header from "@/partials/Header";
import Hero from "@/partials/Hero";
import ArticlesList from "@/partials/ArticlesList";
import Talks from "@/partials/Talks";
import Projects from "@/partials/Projects";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";
import WidgetBook from "@/partials/WidgetBook";
import Footer from "@/partials/Footer";

function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen flex">
        <SideNavigation />

        {/* Main content */}
        <main className="grow overflow-hidden px-6">
          <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
            <Header />
            <Hero />

            {/* Content */}
            <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pb-16 md:pb-20">
              {/* Middle area */}
              <div className="grow">
                <div className="max-w-[700px]">
                  <div className="space-y-10">
                    <ArticlesList />
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

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
