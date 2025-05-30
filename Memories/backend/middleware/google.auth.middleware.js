const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleAuthMiddleware = async (req,res,next) => {
  let accessToken
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {    
    accessToken = authHeader.split(' ')[1];
  }else if (req.body && req.body.token) {
        accessToken = req.body.token;
  }

  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const response = await client.getTokenInfo(accessToken);
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid access token' });
  }
}

module.exports = googleAuthMiddleware;