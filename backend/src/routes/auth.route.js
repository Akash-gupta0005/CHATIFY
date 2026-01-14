import express from 'express';

const router=express.Router();

router.get('/login',(req,res)=>{
    res.json('login endpoint');
})
router.get('/signup',(req,res)=>{
    res.json('signup endpoint');
})
router.get('/logout',(req,res)=>{
    res.json('logout endpoint');
})


export default router;