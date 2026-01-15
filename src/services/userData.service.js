import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* =========================
   PATH
========================= */
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, "../data/userData.json");

/* =========================
   HELPERS
========================= */
function ensureFileExists() {
    if (!fs.existsSync(DATA_PATH)) {
        fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
        fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
    }
}

function readData() {
    ensureFileExists();
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function getToday() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

/* =========================
   GET MY DATA (TODAY)
========================= */
export function getMyData(userId) {
    const data = readData();
    const today = getToday();

    const user = data.find((u) => u.userId === userId);

    if (!user || !user.days || !user.days[today]) {
        return {
            date: today,
            mood: null,
            sleep: null,
            habits: [],
            note: "",
        };
    }

    return user.days[today];
}

/* =========================
   SAVE MY DATA (TODAY)
========================= */
export function saveMyData(userId, payload) {
    const data = readData();
    const today = getToday();

    let user = data.find((u) => u.userId === userId);

    if (!user) {
        user = {
            userId,
            days: {},
        };
        data.push(user);
    }

    user.days[today] = {
        mood: payload.mood !== undefined ? payload.mood : null,
        sleep: payload.sleep !== undefined ? payload.sleep : null,
        habits: Array.isArray(payload.habits) ? payload.habits : [],
        note: payload.note !== undefined ? payload.note : "",
        updatedAt: new Date().toISOString(),
    };

    writeData(data);

    return user.days[today];
}