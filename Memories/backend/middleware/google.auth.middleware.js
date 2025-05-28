const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleAuthMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  const accessToken = authHeader.split(' ')[1];
    try {
        const ticket = await client.verifyIdToken({
            idToken: accessToken,
            audience: process.env.GOOGLE_ID
        });
        const payload = ticket.getPayload();
    req.user = payload;
    console.log(authHeader)
    } catch (err) {
        console.error('Token verification failed:', err);
    }
}

module.exports = googleAuthMiddleware;