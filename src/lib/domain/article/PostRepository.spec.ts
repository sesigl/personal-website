import { beforeEach, describe, expect, it, vi } from "vitest";
import PostRepository, { type Post } from "./PostRepository";
import type { CollectionEntry } from "astro:content";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(async () => [
    {
      id: "mocked-id",
      collection: "blog",
      data: {
        title: "Mocked Post",
        slug: "/mocked-slug",
        category: "tech",
        pubDate: new Date(),
        description: "Mocked Description",
        heroImage: "/mocked-image",
        updatedDate: new Date(),
      },
    } as CollectionEntry<"blog">,
    {
      id: "mocked-id-2",
      collection: "blog",
      data: {
        title: "Mocked Post 2",
        slug: "/mocked-slug-2",
        category: "leadership",
        pubDate: new Date(),
        description: "Mocked Description 2",
        heroImage: "/mocked-image-2",
        updatedDate: new Date(),
      },
    } as CollectionEntry<"blog">,
  ]),
}));

const QUERY_WITHOUT_SEACH_RESULTS = "fdsfjdfi3ojcns";

describe("PostRepository", () => {

  let allPosts: Post[];
  let postRepository = new PostRepository();


  beforeEach(async () => {
    allPosts = await postRepository.findPosts();
  })

  it("should return posts", async function () {
    const posts = await postRepository.findPosts();

    expect(posts.length).greaterThan(0);
  });

  it("should sort posts by date DESC", async function () {
    const posts = await postRepository.findPosts();
    const dates = posts.map((p) => p.data.pubDate);

    expectSortedDesc(dates);
  });

  it("does not find any posts for not matching query", async () => {
    const posts = await postRepository.findPostByQuery(
      QUERY_WITHOUT_SEACH_RESULTS
    );

    expect(posts).lengthOf(0); 
  });

  it("finds posts by matching query", async () => {
    const posts = await postRepository.findPostByQuery("Mocked");

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
