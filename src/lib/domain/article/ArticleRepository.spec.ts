import { describe, expect, it } from "vitest";
import ArticleRepository from "@/lib/domain/article/ArticleRepository";
import { allPosts } from "contentlayer/generated";

const QUERY_WITHOUT_SEACH_RESULTS = "fdsfjdfi3ojcns";
describe("ArticleRepository", () => {
  let articleRepository = new ArticleRepository();

  it("should return posts", function () {
    const posts = articleRepository.findPosts();

    expect(posts.length).greaterThan(0);
  });

  it("should sort posts by date DESC", function () {
    const posts = articleRepository.findPosts();
    const dates = posts.map((p) => new Date(p.publishedAt));

    expectSortedDesc(dates);
  });

  it("does not find any posts for not matching query", () => {
    const posts = articleRepository.findPostByQuery(
      QUERY_WITHOUT_SEACH_RESULTS
    );

    expect(posts).lengthOf(0);
  });

  it("finds posts by matching query", () => {
    const posts = articleRepository.findPostByQuery("become");

    expect(posts.length).lessThan(allPosts.length);
    expect(posts.length).greaterThan(0);
  });

  it("finds posts by matching category only", () => {
    const posts = articleRepository.findPostByQuery("tech", true);

    expect(posts.length).lessThan(allPosts.length);
    expect(posts.length).greaterThan(0);
    expect(posts.every((p) => p.category === "Tech"));
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
