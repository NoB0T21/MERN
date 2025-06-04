const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken')
const userModel = require('../models/google.user.models')

const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleAuthMiddleware = async (req,res,next) => {
  let accessToken
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {    
    accessToken = authHeader.split(' ')[1];
  }else if (req.body && req.body.token) {
        accessToken = req.body.token;
  }

  const token = req.cookies.token
  if (!accessToken && !token) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    let user
    try{const response = await client.getTokenInfo(accessToken);
      const userID = await userModel.findOne({email:response.email});
    user=userID._id}catch{}
    if(!user){
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded.id
    }
    req.user = `${user}`;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid access token' });
  }
}

module.exports = googleAuthMiddleware;