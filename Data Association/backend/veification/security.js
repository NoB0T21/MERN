

export const hashpassword = async (password) => {
    const data = await bcrypt.hash(password, 10);
    return data;
}

export const comparepassword = async (password, hashpassword) => {
    const data = await bcrypt.compare(password, hashpassword);
    return data;
}