import Newsletter from "./Newsletter";

export default interface NewsletterRepository {
  findByTitle(title: string): Promise<Newsletter | null>;
  save(newsletter: Newsletter): Promise<void>;
  update(newsletter: Newsletter): Promise<void>;
}