import User from "../models/User.js";
import express from 'express'

//get express
const router = express();

//define routes
router.get('/', (req, res) => {
    res.render('user/index')
})
router.get('/profile', (req, res) => {
    res.render('user/profile')
})
router.get('/settings', (req, res) => {
    res.render('user/settings')
})

export default router;