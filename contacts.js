const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContactsStorage = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactsStorage(contacts);
  return newContact;
};

const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((contact) => contact.id === id);
  if (indexContact === -1) {
    return null;
  }
  contacts[indexContact] = { id, name, email, phone };
  await updateContactsStorage(contacts);
  return contacts[indexContact];
};

const removeContactById = async (id) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((contact) => contact.id === id);
  if (indexContact === -1) {
    return null;
  }
  const [result] = contacts.splice(indexContact, 1);
  await updateContactsStorage(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
};
