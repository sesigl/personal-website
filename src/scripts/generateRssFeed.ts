import { allPosts } from ".contentlayer/generated/Post/_index.mjs";
import configuration from "../configuration";
import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync } from "fs";

const feed = new Feed({
  title: "Sebastian Sigl's blog about software engineering",
  description:
    "Experience reports, reflecions, opinions and much more about software egineering focused on frontend, backend, architecture, data and machine-learning.",
  id: configuration.baseUrl,
  link: configuration.baseUrl,
  language: "en",
  favicon: configuration.baseUrl + "/favicon.ico",
  copyright: "All rights reserved, Sebastian Sigl",
  author: {
    name: "Sebastian Sigl",
    email: "support@sebastiansigl.com",
    link: configuration.baseUrl,
  },
  image: configuration.baseUrl + "/favicon.png",
});

allPosts
  .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  .forEach((post) => {
    const url = `${configuration.baseUrl}/posts/${post.slug}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.summary,
      date: parseISO(post.publishedAt),
      category: [{ name: post.category }],
      image: configuration.baseUrl + post.image,
      author: [
        {
          name: configuration.name,
          email: configuration.email,
          link: configuration.baseUrl,
        },
      ],
    });
  });

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });
