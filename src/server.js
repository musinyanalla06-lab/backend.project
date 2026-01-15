import express from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

/* ====== ВАЖНО: app создаётся ЗДЕСЬ ====== */
const app = express();
app.use(express.json());
/* ====================================== */

/* ====== путь к users.json ====== */
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "data", "users.json");
/* ================================= */
// app.use(express.static("public"));


/* ====== дальше ТОЛЬКО роуты ====== */

app.post("/api/register", async(req, res) => {
    const { email, phone, password, name } = req.body;

    if ((!email && !phone) || !password) {
        return res
            .status(400)
            .json({ message: "Email or phone and password are required" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

    const exists = users.find(
        u => (email && u.email === email) || (phone && u.phone === phone)
    );

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(),
        email: email || null,
        phone: phone || null,
        name: name || "",
        password: hashedPassword,
        role: "user",
    };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/login", async(req, res) => {
    const { login, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    const user = users.find(u => u.email === login || u.phone === login);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
});

app.get("/api/profile", authMiddleware, (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user;
    res.json(safeUser);
});

/* ====== сервер ====== */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});