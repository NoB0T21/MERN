import express from 'express';
const router = express.Router();

router.get('/posts', (req,res)=>{
    res.send('hellllooo')
})

export default router;