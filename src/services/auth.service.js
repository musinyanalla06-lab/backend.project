import crypto from "crypto";

import {
    validateEmail,
    validatePhone,
    validatePassword,
    validateName,
    validateContact,
} from "../validators/user.validators.js";

import {
    findUserByEmail,
    findUserByPhone,
    createUser,
} from "../repositories/user.repository.js";

import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

function throwError(field, message) {
    throw { field, message };
}

/* =========================
   REGISTRATION
========================= */
export async function registerUser({ email, phone, password, name }) {
    if (!validateContact(email, phone)) {
        throwError("contact", "Укажите email или телефон");
    }

    const normalizedEmail = email ?
        email.trim().toLowerCase() :
        null;

    const normalizedPhone = phone ?
        phone.trim() :
        null;


    if (normalizedEmail && !validateEmail(normalizedEmail)) {
        throwError("email", "Неверный формат email");
    }

    if (normalizedPhone && !validatePhone(normalizedPhone)) {
        throwError("phone", "Неверный формат телефона");
    }

    if (!validatePassword(password)) {
        throwError("password", "Пароль слишком слабый");
    }

    if (name && !validateName(name)) {
        throwError("name", "Неверное имя");
    }

    if (normalizedEmail && findUserByEmail(normalizedEmail)) {
        throwError("email", "Email уже зарегистрирован");
    }

    if (normalizedPhone && findUserByPhone(normalizedPhone)) {
        throwError("phone", "Телефон уже зарегистрирован");
    }

    const user = {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        phone: normalizedPhone,
        password: await hashPassword(password),
        name: name || null,
        role: "user",
        blocked: false,
        createdAt: new Date().toISOString(),
    };

    createUser(user);

    return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
    };
}

/* =========================
   LOGIN
========================= */
export async function loginUser({ login, password }) {
    if (!login || !password) {
        throwError("form", "Введите логин и пароль");
    }

    const value = login.trim();

    const user = value.includes("@") ?
        findUserByEmail(value.toLowerCase()) :
        findUserByPhone(value);

    if (!user || !(await comparePassword(password, user.password))) {
        throwError("form", "Неверный логин или пароль");
    }

    if (user.blocked) {
        throwError("form", "Пользователь заблокирован");
    }

    return {
        token: generateToken(user),
        user: {
            id: user.id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            role: user.role,
        },
    };
}