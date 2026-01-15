import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMyData, saveMyData } from "../services/userData.service.js";

const router = Router();

/**
 * Получить мои данные
 */
router.get("/me/data", authMiddleware, (req, res) => {
    const data = getMyData(req.user.id);
    res.json(data);
});

/**
 * Сохранить мои данные
 */
router.post("/me/data", authMiddleware, (req, res) => {
    const saved = saveMyData(req.user.id, req.body);
    res.json(saved);
});

export default router;