import { Router } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { findUserById } from "../repositories/user.repository.js";

const router = Router();

/**
 * Регистрация
 */
router.post("/register", async(req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            field: err.field || "form",
            message: err.message,
        });
    }
});

/**
 * Логин
 */
router.post("/login", async(req, res) => {
    try {
        const data = await loginUser(req.body);
        res.json(data);
    } catch (err) {
        res.status(400).json({
            field: err.field || "form",
            message: err.message,
        });
    }
});

/**
 * Текущий пользователь
 */
router.get("/me", authMiddleware, (req, res) => {
    const user = findUserById(req.user.id);

    if (!user) {
        return res.status(404).json({
            field: "user",
            message: "Пользователь не найден",
        });
    }

    res.json({
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: user.role,
    });
});

export default router;