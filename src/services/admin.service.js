export async function loginUser({ login, password }) {
    if (!login || !password) {
        throw new Error("Введите логин и пароль");
    }

    const normalizedLogin = login.trim().toLowerCase();

    const isEmail = normalizedLogin.includes("@");
    const user = isEmail ?
        findUserByEmail(normalizedLogin) :
        findUserByPhone(normalizedLogin);

    if (!user) {
        throw new Error("Неверный логин или пароль");
    }

    if (user.blocked) {
        throw new Error("Пользователь заблокирован");
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        throw new Error("Неверный логин или пароль");
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