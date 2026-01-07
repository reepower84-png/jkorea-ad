import fs from "fs";
import path from "path";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getContacts(): Contact[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addContact(contact: Omit<Contact, "id" | "createdAt">): Contact {
  ensureDataDir();
  const contacts = getContacts();

  const newContact: Contact = {
    id: Date.now().toString(),
    ...contact,
    createdAt: new Date().toISOString(),
  };

  contacts.unshift(newContact);
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

  return newContact;
}

export function deleteContact(id: string): boolean {
  ensureDataDir();
  const contacts = getContacts();
  const filteredContacts = contacts.filter((c) => c.id !== id);

  if (filteredContacts.length === contacts.length) {
    return false;
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(filteredContacts, null, 2));
  return true;
}
