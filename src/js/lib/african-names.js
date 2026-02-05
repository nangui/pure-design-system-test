/**
 * African first names, last names, and cities for demo data.
 * Single source — no external country folders. Used for customers, members, mails, notifications.
 */

export const FIRST_NAMES = [
  "Amadou", "Fatou", "Moussa", "Aminata", "Ibrahima", "Mariama", "Ousmane", "Awa",
  "Mamadou", "Khadija", "Souleymane", "Ndeye", "Abdoulaye", "Aïssatou", "Cheikh", "Adama",
  "Oumar", "Fatima", "Sidy", "Maimouna", "Thierno", "Sokhna", "Samba", "Kofi",
  "Abena", "Kwame", "Ama", "Chinedu", "Ngozi", "Adebayo", "Oluwaseun", "Tendai",
  "Zanele", "Thabo", "Lerato", "Amara", "Yaa",
];

export const LAST_NAMES = [
  "Diallo", "Ndiaye", "Sow", "Fall", "Ba", "Kane", "Traoré", "Sarr",
  "Sene", "Diop", "Mbaye", "Gueye", "Barry", "Okafor", "Nwosu", "Okonkwo",
  "Mensah", "Asante", "Boateng", "Dlamini", "Mbeki", "Osei", "Kamara", "Toure",
];

export const CITIES = [
  "Dakar", "Lagos", "Nairobi", "Johannesburg", "Cairo", "Abidjan", "Accra",
  "Douala", "Kinshasa", "Addis Ababa", "Dar es Salaam", "Kampala", "Durban",
  "Cape Town", "Bamako", "Ouagadougou", "Lomé", "Cotonou",
];

/** Email domains that look plausible for African contexts */
export const EMAIL_DOMAINS = ["mail.sn", "mail.ng", "mail.za", "example.co.ke", "example.eg", "mail.ci"];

/**
 * Build a slug for email: lowercase, no accents, spaces to dots.
 * @param {string} str
 * @returns {string}
 */
export function slug(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.-]/g, "");
}

/**
 * Generate a random item from an array.
 * @param {Array<T>} arr
 * @param {number} [seed] - Optional seed for reproducibility
 * @returns {T}
 * @template T
 */
function pick(arr, seed) {
  const i = seed != null ? Math.abs(seed) % arr.length : Math.floor(Math.random() * arr.length);
  return arr[i];
}

/**
 * Generate one person: African name + email.
 * @param {number} [id] - Used as seed for deterministic choice
 * @returns {{ name: string, email: string, location: string }}
 */
export function generatePerson(id = 0) {
  const first = pick(FIRST_NAMES, id);
  const last = pick(LAST_NAMES, id + 1);
  const name = `${first} ${last}`;
  const local = `${slug(first)}.${slug(last)}`;
  const domain = pick(EMAIL_DOMAINS, id + 2);
  const email = `${local}@${domain}`;
  const city = pick(CITIES, id + 3);
  const location = city;
  return { name, email, location };
}

/**
 * Generate a list of people with African names and emails.
 * @param {number} count
 * @returns {Array<{ id: number, name: string, email: string, location: string }>}
 */
export function generatePeople(count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = generatePerson(i + 1);
    out.push({ id: i + 1, ...p });
  }
  return out;
}
