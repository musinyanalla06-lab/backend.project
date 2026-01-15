export function validateEmail(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validatePhone(phone) {
    if (!phone) return true;

    const normalized = phone.replace(/\s+/g, "");
    const regex = /^(\+374\d{8}|0\d{8})$/;
    return regex.test(normalized);
}

export function validateContact(email, phone) {
    return Boolean(email || phone);
}

export function validatePassword(password) {
    if (!password || password.length < 6) return false;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^\w\s]/.test(password);
    return hasLetter && hasDigit && hasSpecial;
}

/* ✅ ИСПРАВЛЕНО */
export function validateName(name) {
    if (!name) return true;
    return name.length >= 2 && name.length <= 30;
}