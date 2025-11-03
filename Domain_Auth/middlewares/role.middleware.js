export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const { roles } = req.user;
    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }
    next();
  };
};

//Puede borrarse este archivo si no se usa