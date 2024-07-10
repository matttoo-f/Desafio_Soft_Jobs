const validateParamsLogin = (req, res, next) => {
    const { email, password } = req.body; // Destructura directamente del body

    if (!email || !password) {
        return res.status(400).json({ error: "El email y la contraseña deben estar presentes" });
    }
    
    next(); // Llama a next() para pasar al siguiente middleware o controlador
};

export {validateParamsLogin}