import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

/* =========================
   GENERATE TOKEN
========================= */
export function generateToken(user) {
    return jwt.sign({
            id: user.id,
            role: user.role,
        },
        JWT_SECRET, { expiresIn: "7d" }
    );
}

/* =========================
   VERIFY TOKEN
========================= */
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}