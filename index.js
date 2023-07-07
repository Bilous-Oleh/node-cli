// const yargs = require("yargs");
const { Command } = require("commander");

const program = new Command();
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n  , --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "getById":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    case "updateById":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.table(updateContact);
    case "deleteById":
      const deleteContact = await contacts.removeContactById(id);
      return console.table(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);