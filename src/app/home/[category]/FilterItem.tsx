import React from "react";
import Link from "next/link";
import ArticleCategory from "@/lib/domain/article/ArticleType";

export default function FilterItem({
  value,
  active,
}: {
  value: ArticleCategory;
  active: boolean;
}) {
  const aClassNames = active
    ? "block py-3 font-medium text-slate-800 dark:text-slate-100 border-b-2 border-sky-500"
    : "block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300";

  let href = value === "Backend" ? "/" : `/home/${value}`;
  return (
    <li className="px-3 -mb-px">
      <Link className={aClassNames} href={href as any}>
        {value}
      </Link>
    </li>
  );
}
