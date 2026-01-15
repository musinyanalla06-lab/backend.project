const user = {
    id,
    email,
    phone,
    password: hashedPassword,
    name,
    role: "user",
    blocked: false,
    created_at: new Date()
};