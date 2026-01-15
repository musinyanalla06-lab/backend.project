import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "../data/userData.json");

function readData() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function findUserDataByUserId(userId) {
    const data = readData();
    return data.find((item) => item.userId === userId);
}

export function upsertUserData(userId, payload) {
    const data = readData();
    const index = data.findIndex((item) => item.userId === userId);

    const record = {
        userId,
        mood: payload.mood !== undefined ? payload.mood : null,
        sleep: payload.sleep !== undefined ? payload.sleep : null,
        habits: payload.habits !== undefined ? payload.habits : [],
        updatedAt: new Date().toISOString(),
    };

    if (index === -1) {
        data.push(record);
    } else {
        data[index] = {...data[index], ...record };
    }

    writeData(data);
    return record;
}