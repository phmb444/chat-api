const jwt = require("jsonwebtoken");

const checkToken = (token) => {
    try {
        let test = jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const decryptToken = async (token) => {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
}

module.exports = { checkToken, generateToken, decryptToken };
