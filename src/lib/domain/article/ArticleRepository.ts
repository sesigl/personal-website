import Article from "@/lib/domain/article/Article";

let articleId = 0;
const items: Article[] = [
  new Article({
    id: articleId++,
    title: "Java Random Number Generator",
    slug: "/post",
    image: "/images/post-thumb-02.jpg",
    date: "Jul 19, 2022",
    category: "Backend",
    excerpt:
      "In many applications, you need random numbers. You might need to throw dice in video games, create a private cryptography key, or create a user’s temporary password.",
    link: "https://www.freecodecamp.org/news/java-random-number-generator-how-to-generate-with-math-random-and-convert-to-integer/",
  }),
  new Article({
    id: articleId++,
    title: "How to Install Java in Ubuntu – JDK Linux Tutorial",
    slug: "/post",
    image: "/images/post-thumb-03.jpg",
    date: "Jun 28, 2022",
    category: "Backend",
    excerpt:
      "Java is one of the most popular programming languages in use today. And a clean setup lets you seamlessly install Java and switch between different versions when you're building applications.",
    link: "https://www.freecodecamp.org/news/how-to-install-java-in-ubuntu-jdk-linux-tutorial/",
  }),
  new Article({
    id: articleId++,
    title: "What Does K8s Mean?",
    slug: "/post",
    image: "/images/post-thumb-04.jpg",
    date: "Jun 6, 2022",
    category: "DevOps",
    excerpt:
      "You might've seen the term k8s in different sources, and wondered what it means. Well, it means Kubernetes.",
    link: "https://www.freecodecamp.org/news/what-does-k8s-mean-kubernetes-setup-guide/",
  }),
  new Article({
    id: articleId++,
    title: "What is Docker?",
    slug: "/post",
    image: "/images/post-thumb-05.jpg",
    date: "Apr 19, 2022",
    category: "DevOps",
    excerpt:
      "Containers are an essential tool for software development today. Running applications in any environment becomes easy when you leverage containers.",
    link: "https://www.freecodecamp.org/news/what-is-docker-learn-how-to-use-containers-with-examples/",
  }),
  new Article({
    id: articleId++,
    title: "Docker Mount Volume – How To Mount a Local Directory",
    slug: "/post",
    image: "/images/post-thumb-06.jpg",
    date: "Apr 4, 2022",
    category: "DevOps",
    excerpt:
      "Containers make software engineering easier and more efficient, and Docker containers are popular and easy to use.",
    link: "https://www.freecodecamp.org/news/docker-mount-volume-guide-how-to-mount-a-local-directory/",
  }),
  new Article({
    id: articleId++,
    title: "How to Do a Clean Docker Image Rebuild and Clear Docker's Cache",
    slug: "/post",
    image: "/images/post-thumb-07.jpg",
    date: "Mar 28, 2022",
    category: "DevOps",
    excerpt:
      "Containers enable you to package your application in a portable way that can run in many environments. The most popular container platform is Docker.",
    link: "https://www.freecodecamp.org/news/docker-cache-tutorial/",
  }),
  new Article({
    id: articleId++,
    title: "How to Remove All Docker Images – A Docker Cleanup Guide",
    slug: "/post",
    image: "/images/post-thumb-08.jpg",
    date: "Mar 14, 2022",
    category: "DevOps",
    excerpt:
      "Containers are everywhere in today’s tech world. The most popular technology for container management is Docker. It makes using containers easy and helps you easily get applications up and running.",
    link: "https://www.freecodecamp.org/news/how-to-remove-all-docker-images-a-docker-cleanup-guide/",
  }),
  new Article({
    id: articleId++,
    title: "The Apache Cassandra Beginner Tutorial",
    slug: "/post",
    image: "/images/post-thumb-01.jpg",
    date: "Jul 15, 2021",
    category: "Backend",
    excerpt:
      "There are lots of data-storage options available today. You have to choose between managed or unmanaged, relational or NoSQL, write- or read-optimized, proprietary or open-source — and it doesn't end there.",
    link: "https://www.freecodecamp.org/news/the-apache-cassandra-beginner-tutorial/",
  }),
  new Article({
    id: articleId++,
    title: "Helm Charts Tutorial: The Kubernetes Package Manager Explained",
    slug: "/post",
    image: "/images/post-thumb-01.jpg",
    date: "Dec 31, 2020",
    category: "DevOps",
    excerpt:
      "There are different ways of running production services at a high scale. One popular solution for running containers in production is Kubernetes. But interacting with Kubernetes directly comes with some caveats.",
    link: "https://www.freecodecamp.org/news/helm-charts-tutorial-the-kubernetes-package-manager-explained/",
  }),
  new Article({
    id: articleId++,
    title: "Kubernetes VS Docker: What's the Difference?",
    slug: "/post",
    image: "/images/post-thumb-02.jpg",
    date: "Dec 10, 2020",
    category: "DevOps",
    excerpt:
      "Nowadays, two of the essential tools in a developer's toolbox are Docker and Kubernetes. Both let developers to package applications into containers to run them in different environments.",
    link: "https://www.freecodecamp.org/news/kubernetes-vs-docker-whats-the-difference-explained-with-examples/",
  }),
  new Article({
    id: articleId++,
    title: "Where are Docker Images Stored? Docker Container Paths Explained",
    slug: "/post",
    image: "/images/post-thumb-03.jpg",
    date: "Feb 6, 2020",
    category: "DevOps",
    excerpt:
      "Docker has been widely adopted and is used to run and scale applications in production. Additionally, it can be used to start applications quickly by executing a single Docker command.",
    link: "https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/",
  }),
  new Article({
    id: articleId++,
    title: "Docker Image Guide: Handle Docker Images, Containers, and Volumes",
    slug: "/post",
    image: "/images/post-thumb-04.jpg",
    date: "Jan 30, 2020",
    category: "DevOps",
    excerpt:
      "Docker has been widely adopted and is a great vehicle to deploy an application to the cloud (or some other Docker-ready infrastructure). It is also useful for local development. You can start complex applications quickly, develop in isolation, and still have a very good performance.",
    link: "https://www.freecodecamp.org/news/docker-image-guide-how-to-remove-and-delete-docker-images-stop-containers-and-remove-all-volumes/",
  }),
  new Article({
    id: articleId++,
    title:
      "Text Classification Demystified: An Introduction to Word Embeddings",
    slug: "/post",
    image: "/images/post-thumb-05.jpg",
    date: "Jan 20, 2022",
    category: "Machine-Learning",
    excerpt:
      "Word embeddings are used to create neural networks in a more flexible way. They can be built using neural networks that have a certain task, such as prediction of a target word for a given context word.",
    link: "https://www.freecodecamp.org/news/demystify-state-of-the-art-text-classification-word-embeddings/",
  }),
  new Article({
    id: articleId++,
    title: "How to speed up shared file access in Docker for Mac",
    slug: "/post",
    image: "/images/post-thumb-06.jpg",
    date: "Mar 17, 2017",
    category: "DevOps",
    excerpt:
      "For small projects the bad performance is not a critical issue. For huge application rsync is our hero. Good old tools, and still reliable and important.",
    link: "https://www.freecodecamp.org/news/speed-up-file-access-in-docker-for-mac-fbeee65d0ee7/",
  }),
];
export default class ArticleRepository {
  findAll() {
    return items;
  }
}
