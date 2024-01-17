const jwt = require('jsonwebtoken');


const verifyToken=async(req,res)=>{
    const token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
     const decoded = jwt.verify(token,process.env.SECRET_KEY);
     req.userId = decoded.userId;
     next();
     } catch (error) {
     res.status(401).json({ error: 'Invalid token' });
     }
}

module.exports = verifyToken;