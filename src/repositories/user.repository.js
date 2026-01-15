import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ ВСЕГДА backend/src/data/users.json
const DATA_PATH = path.resolve(__dirname, "../data/users.json");

// helpers
function ensureFileExists() {
    if (!fs.existsSync(DATA_PATH)) {
        fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
        fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
    }
}

function readUsers() {
    ensureFileExists();
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeUsers(users) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

// public API
export function getAllUsers() {
    return readUsers();
}

export function findUserByEmail(email) {
    if (!email) return null;
    return readUsers().find((u) => u.email === email);
}

export function findUserByPhone(phone) {
    if (!phone) return null;
    return readUsers().find((u) => u.phone === phone);
}

export function createUser(user) {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
    return user;
}

export function findUserById(id) {
    return readUsers().find((u) => u.id === id);
}