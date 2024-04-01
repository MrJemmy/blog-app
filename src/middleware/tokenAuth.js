const jwt = require('jsonwebtoken');

const { isTokenRevoked } = require('../middleware/tokenBlacklist');

const secret = process.env.SECRET

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (isTokenRevoked(token)){
      return res.status(401).json({ message: 'Token Is Revoked' });
    }
  
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      req.user = user;
      next();
    });
}

module.exports = authenticateToken