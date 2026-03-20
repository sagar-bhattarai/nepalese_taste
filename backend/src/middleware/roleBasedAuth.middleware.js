const roleBasedAuth = (role) => {
    return (req, res, next) => {
        const hasAccess = req.roles?.some(r => role.includes(r));
        if (hasAccess) {
            return next();
        };
        return res.status(403).send("Access Denined.!");
    };
};

export default roleBasedAuth;
