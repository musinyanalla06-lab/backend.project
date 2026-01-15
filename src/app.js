import readline from "readline";
import { registerUser, loginUser } from "./services/auth.service.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
    console.log("=== FocusFlow Backend ===");

    while (true) {
        console.log("\n1. Регистрация");
        console.log("2. Логин");
        console.log("3. Выход");

        const choice = await ask("Выбор: ");

        try {
            if (choice === "1") {
                const email = await ask("Email (Enter если нет): ");
                const phone = await ask("Телефон (Enter если нет): ");
                const name = await ask("Имя (Enter если нет): ");
                const password = await ask("Пароль: ");

                const user = await registerUser({
                    email: email || null,
                    phone: phone || null,
                    name: name || null,
                    password,
                });

                console.log("✅ Пользователь создан:", user);
            }

            if (choice === "2") {
                const login = await ask("Email или телефон: ");
                const password = await ask("Пароль: ");

                const user = await loginUser({ login, password });
                console.log("✅ Успешный вход:", user);
            }

            if (choice === "3") {
                rl.close();
                break;
            }
        } catch (err) {
            console.error("❌ Ошибка:", err.message);
        }
    }
}

main();