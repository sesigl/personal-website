import { getCollection, type CollectionEntry } from "astro:content";
import Fuse from "fuse.js";

export type Post = CollectionEntry<'blog'> & { data: { link?: string } }

let postId = 0;
const externalPosts: Post[] = [
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Java Random Number Generator",
      slug: "/post",
      category: "tech",
      description: "In many applications, you need random numbers...",
      pubDate: new Date("2022-07-19"),
      heroImage: "/images/post-thumb-02.jpg",
      link: "https://www.freecodecamp.org/news/java-random-number-generator-how-to-generate-with-math-random-and-convert-to-integer/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "How to Install Java in Ubuntu – JDK Linux Tutorial",
      slug: "/post",
      category: "tech",
      description: "Java is one of the most popular programming languages...",
      pubDate: new Date("2022-06-28"),
      heroImage: "/images/post-thumb-03.jpg",
      link: "https://www.freecodecamp.org/news/how-to-install-java-in-ubuntu-jdk-linux-tutorial/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "What Does K8s Mean?",
      slug: "/post",
      category: "tech",
      description: "You might've seen the term k8s in different sources, and wondered what it means. Well, it means Kubernetes.",
      pubDate: new Date("2022-06-06"),
      heroImage: "/images/post-thumb-04.jpg",
      link: "https://www.freecodecamp.org/news/what-does-k8s-mean-kubernetes-setup-guide/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "What is Docker?",
      slug: "/post",
      category: "tech",
      description: "Containers are an essential tool for software development today. Running applications in any environment becomes easy when you leverage containers.",
      pubDate: new Date("2022-04-19"),
      heroImage: "/images/post-thumb-05.jpg",
      link: "https://www.freecodecamp.org/news/what-is-docker-learn-how-to-use-containers-with-examples/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Docker Mount Volume – How To Mount a Local Directory",
      slug: "/post",
      category: "tech",
      description: "Containers make software engineering easier and more efficient, and Docker containers are popular and easy to use.",
      pubDate: new Date("2022-04-04"),
      heroImage: "/images/post-thumb-06.jpg",
      link: "https://www.freecodecamp.org/news/docker-mount-volume-guide-how-to-mount-a-local-directory/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "How to Do a Clean Docker Image Rebuild and Clear Docker's Cache",
      slug: "/post",
      category: "tech",
      description: "Containers enable you to package your application in a portable way that can run in many environments. The most popular container platform is Docker.",
      pubDate: new Date("2022-03-28"),
      heroImage: "/images/post-thumb-07.jpg",
      link: "https://www.freecodecamp.org/news/docker-cache-tutorial/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "How to Remove All Docker Images – A Docker Cleanup Guide",
      slug: "/post",
      category: "tech",
      description: "Containers are everywhere in today’s tech world. The most popular technology for container management is Docker. It makes using containers easy and helps you easily get applications up and running.",
      pubDate: new Date("2022-03-14"),
      heroImage: "/images/post-thumb-08.jpg",
      link: "https://www.freecodecamp.org/news/how-to-remove-all-docker-images-a-docker-cleanup-guide/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "The Apache Cassandra Beginner Tutorial",
      slug: "/post",
      category: "tech",
      description: "There are lots of data-storage options available today. You have to choose between managed or unmanaged, relational or NoSQL, write- or read-optimized, proprietary or open-source — and it doesn't end there.",
      pubDate: new Date("2021-07-15"),
      heroImage: "/images/post-thumb-01.jpg",
      link: "https://www.freecodecamp.org/news/the-apache-cassandra-beginner-tutorial/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Helm Charts Tutorial: The Kubernetes Package Manager Explained",
      slug: "/post",
      category: "tech",
      description: "There are different ways of running production services at a high scale. One popular solution for running containers in production is Kubernetes. But interacting with Kubernetes directly comes with some caveats.",
      pubDate: new Date("2020-12-31"),
      heroImage: "/images/post-thumb-01.jpg",
      link: "https://www.freecodecamp.org/news/helm-charts-tutorial-the-kubernetes-package-manager-explained/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Kubernetes VS Docker: What's the Difference?",
      slug: "/post",
      category: "tech",
      description: "Nowadays, two of the essential tools in a developer's toolbox are Docker and Kubernetes. Both let developers to package applications into containers to run them in different environments.",
      pubDate: new Date("2020-12-10"),
      heroImage: "/images/post-thumb-02.jpg",
      link: "https://www.freecodecamp.org/news/kubernetes-vs-docker-whats-the-difference-explained-with-examples/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Where are Docker Images Stored? Docker Container Paths Explained",
      slug: "/post",
      category: "tech",
      description: "Docker has been widely adopted and is used to run and scale applications in production. Additionally, it can be used to start applications quickly by executing a single Docker command.",
      pubDate: new Date("2020-02-06"),
      heroImage: "/images/post-thumb-03.jpg",
      link: "https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Docker Image Guide: Handle Docker Images, Containers, and Volumes",
      slug: "/post",
      category: "tech",
      description: "Docker has been widely adopted and is a great vehicle to deploy an application to the cloud (or some other Docker-ready infrastructure). It is also useful for local development. You can start complex applications quickly, develop in isolation, and still have a very good performance.",
      pubDate: new Date("2020-01-30"),
      heroImage: "/images/post-thumb-04.jpg",
      link: "https://www.freecodecamp.org/news/docker-image-guide-how-to-remove-and-delete-docker-images-stop-containers-and-remove-all-volumes/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "Text Classification Demystified: An Introduction to Word Embeddings",
      slug: "/post",
      category: "tech",
      description: "Word embeddings are used to create neural networks in a more flexible way. They can be built using neural networks that have a certain task, such as prediction of a target word for a given context word.",
      pubDate: new Date("2022-01-20"),
      heroImage: "/images/post-thumb-05.jpg",
      link: "https://www.freecodecamp.org/news/demystify-state-of-the-art-text-classification-word-embeddings/"
    }
  },
  {
    id: String(postId++),
    collection: "blog",
    data: {
      title: "How to speed up shared file access in Docker for Mac",
      slug: "/post",
      category: "tech",
      description: "For small projects the bad performance is not a critical issue. For huge application rsync is our hero. Good old tools, and still reliable and important.",
      pubDate: new Date("2017-03-17"),
      heroImage: "/images/post-thumb-06.jpg",
      link: "https://www.freecodecamp.org/news/speed-up-file-access-in-docker-for-mac-fbeee65d0ee7/"
    }
  },
];
export default class PostRepository {
  findExternalPosts() {
    return externalPosts;
  }

  async findPosts(): Promise<Post[]> {
    return Array.from(await getCollection('blog')).concat(externalPosts).sort((a, b) => {
      return a.data.pubDate > b.data.pubDate ? -1 : 1;
    });
  }

  async findPostByQuery(query: string, isCategoryOnly = false) {
    const posts = await this.findPosts();

    const postKeys = Object.keys(posts[0] ?? {});

    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: isCategoryOnly ? ["data.category"] : postKeys,
    };

    const fuse = new Fuse(posts, options);

    return fuse.search(query).map((result) => result.item);
  }
}
