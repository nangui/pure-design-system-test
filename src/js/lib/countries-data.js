/**
 * Build customers and members using African names and emails only.
 * Uses src/js/lib/african-names.js — no /api/countries folder dependency.
 */

import { generatePeople } from "./african-names.js";

const STATUSES = ["subscribed", "subscribed", "subscribed", "unsubscribed", "bounced"];
const ROLES = ["member", "member", "owner"];

/**
 * Build a list of people with African names and emails.
 * @param {number} count
 * @returns {Promise<Array<{ id: number, name: string, email: string, location: string }>>}
 */
export async function loadPeopleFromCountries(count = 16) {
  return Promise.resolve(generatePeople(count));
}

/**
 * Build customers list for the dashboard (with status).
 * @param {number} [max=8]
 * @returns {Promise<Array<{ id: number, name: string, email: string, avatar: { src: string }, status: string, location: string }>>}
 */
export async function loadCustomersFromCountries(max = 8) {
  const people = await loadPeopleFromCountries(max);
  return people.map((p, i) => ({
    id: p.id,
    name: p.name,
    email: p.email,
    avatar: { src: `https://i.pravatar.cc/128?u=${p.id}` },
    status: STATUSES[i % STATUSES.length],
    location: p.location,
  }));
}

/**
 * Build members list (name, role) for settings.
 * @param {number} [max=12]
 * @returns {Promise<Array<{ name: string, role: string }>>}
 */
export async function loadMembersFromCountries(max = 12) {
  const people = await loadPeopleFromCountries(max);
  return people.slice(0, max).map((p, i) => ({
    name: p.name,
    role: ROLES[i % ROLES.length],
  }));
}
