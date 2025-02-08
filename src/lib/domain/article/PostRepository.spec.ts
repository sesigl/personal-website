import { describe, expect, it } from "vitest";
import PostRepository from "./PostRepository";
import { getCollection } from "astro:content";

const QUERY_WITHOUT_SEACH_RESULTS = "fdsfjdfi3ojcns";
const allPosts = await getCollection("blog");

describe("PostRepository", () => {
  let postRepository = new PostRepository();

  it("should return posts", async function () {
    const posts = await postRepository.findPosts();

    expect(posts.length).greaterThan(0);
  });

  it("should sort posts by date DESC", async function () {
    const posts = await postRepository.findPosts();
    const dates = posts.map((p) => p.data.pubDate);

    expectSortedDesc(dates);
  });

  it("does not find any posts for not matching query", () => {
    const posts = postRepository.findPostByQuery(
      QUERY_WITHOUT_SEACH_RESULTS
    );

    expect(posts).lengthOf(0);
  });

  it("finds posts by matching query", async () => {
    const posts = await postRepository.findPostByQuery("become");

    expect(posts.length).lessThan(allPosts.length);
    expect(posts.length).greaterThan(0);
  });

  it("finds posts by matching category only", async () => {
    const posts = await postRepository.findPostByQuery("tech", true);

    expect(posts.length).lessThan(allPosts.length);
    expect(posts.length).greaterThan(0);
    expect(posts.every((p) => p.data.category === "tech"));
  });

  function expectSortedDesc(dates: Date[]) {
    let lastDate: Date | null = null;
    for (let date of dates) {
      if (lastDate) {
        expect(date).lessThanOrEqual(lastDate);
      }
      lastDate = date;
    }
  }
});
