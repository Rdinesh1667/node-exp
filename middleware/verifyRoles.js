const verifyRoles = (...allowedRoles) => {

    return (req, res, next) => {
        if (!req.roles) return res.sendStatus(401); // Unauth
        const roles = [...allowedRoles];
        console.log('ALLOWED ROLES : ', roles);
        console.log('CURRENT USE\'S ROLES : ', req.roles);
        const result = req.roles.map(role => roles.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }

}

module.exports = verifyRoles