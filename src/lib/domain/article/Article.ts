import ArticleCategory from "@/lib/domain/article/ArticleType";

export default class Article {
  readonly id: number;
  readonly date: string;
  readonly image: string;
  readonly link: string;
  readonly title: string;
  readonly category: ArticleCategory;
  readonly excerpt: string;
  readonly slug: string;

  constructor(articleProps: {
    date: string;
    image: string;
    link: string;
    id: number;
    title: string;
    category: ArticleCategory;
    excerpt: string;
    slug: string;
  }) {
    this.id = articleProps.id;
    this.date = articleProps.date;
    this.image = articleProps.image;
    this.link = articleProps.link;
    this.title = articleProps.title;
    this.category = articleProps.category;
    this.excerpt = articleProps.excerpt;
    this.slug = articleProps.slug;
  }
}
