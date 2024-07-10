const validateParametersUser = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
  
    console.log(req.body); // Verifica qué datos están llegando aquí
  
    if (!email || !password || !rol || !lenguage) {
      return res.status(400).json({ error: "El email, password, rol y lenguage deben estar presentes." });
    }
  
    next();
  };
  
  export { validateParametersUser };
  