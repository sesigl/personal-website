import React from "react";

import ArticleItem from "../partials/ArticleItem";

function ArticlesList() {
  const items = [
    {
      id: 0,
      title: "An Interactive Guide to Flexbox",
      slug: "/post",
      image: "/images/post-thumb-01.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 1,
      title: "Fuzzy Logic in a Hurry",
      slug: "/post",
      image: "/images/post-thumb-02.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 2,
      title: "Machine Learning for Humans",
      slug: "/post",
      image: "/images/post-thumb-03.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 3,
      title: "Writing My First Security Blogpost",
      slug: "/post",
      image: "/images/post-thumb-04.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 4,
      title: "10 YouTube Channels That Will Make You Smarter",
      slug: "/post",
      image: "/images/post-thumb-05.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 5,
      title: "How to Control CSS Animations with JavaScript",
      slug: "/post",
      image: "/images/post-thumb-06.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 6,
      title: "Lies You've Been Told About Podcasting",
      slug: "/post",
      image: "/images/post-thumb-07.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
    {
      id: 7,
      title: "How to Extend Prototypes with JavaScript",
      slug: "/post",
      image: "/images/post-thumb-08.jpg",
      date: "Dec 24, 2023",
      excerpt:
        "Flexbox is a remarkably flexible layout mode. When we understand how it works, we can build responsive designs that rearrange themselves as needed.",
    },
  ];

  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-3">Latest Articles</h2>

      {/* Filters */}
      <ul className="flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800">
        <li className="px-3 -mb-px">
          <a className="block py-3 font-medium text-slate-800 dark:text-slate-100 border-b-2 border-sky-500">
            Coding
          </a>
        </li>
        <li className="px-3 -mb-px">
          <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            Startups
          </a>
        </li>
        <li className="px-3 -mb-px">
          <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            Tutorials
          </a>
        </li>
        <li className="px-3 -mb-px">
          <a className="block py-3 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            Indie Hacking
          </a>
        </li>
      </ul>

      {/* Articles list */}
      <div>
        {items.map((item) => {
          return (
            <ArticleItem
              key={item.id}
              title={item.title}
              slug={item.slug}
              image={item.image}
              date={item.date}
              excerpt={item.excerpt}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ArticlesList;
