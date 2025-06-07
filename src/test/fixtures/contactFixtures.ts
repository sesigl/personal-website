import Contact from "../../lib/domain/newsletter/Contact";

export const testContacts = {
  user1: new Contact("user1@example.com", "unsubscribe-key-user1"),
  user2: new Contact("user2@example.com", "unsubscribe-key-user2"),
  user3: new Contact("user3@example.com", "unsubscribe-key-user3"),
  testUser: new Contact("test@example.com", "unsubscribe-key-test"),
};

export const createTestContacts = (count: number = 3): Contact[] => {
  const contacts: Contact[] = [];
  for (let i = 1; i <= count; i++) {
    contacts.push(new Contact(`user${i}@example.com`, `unsubscribe-key-user${i}`));
  }
  return contacts;
};

export const createTestContactsWithTestUser = (regularCount: number = 2): Contact[] => {
  return [
    ...createTestContacts(regularCount),
    testContacts.testUser
  ];
};