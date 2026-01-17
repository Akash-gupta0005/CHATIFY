import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/login',(req,res)=>{
    res.json('login endpoint');
})
router.post('/signup',signup)
router.get('/logout',(req,res)=>{
    res.json('logout endpoint');
})


export default router;