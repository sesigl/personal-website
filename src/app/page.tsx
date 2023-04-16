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
import HomeCategoryPage from "@/app/home/[category]/page";

function Page() {
  return <HomeCategoryPage params={{ category: "Backend" }} />;
}

export default Page;
