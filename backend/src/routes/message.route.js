import express from 'express';

const router=express.Router();

router.get("/send",(req,res)=>{
    res.json('send message endpoint');
})

export default router;