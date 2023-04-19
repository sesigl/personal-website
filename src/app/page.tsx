import React from "react";
import HomeCategoryPage from "@/app/home/[category]/page";

function Page() {
  return <HomeCategoryPage params={{ category: "All" }} />;
}

export default Page;
