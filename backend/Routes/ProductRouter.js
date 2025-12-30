import express from 'express';
import ensureAuthenticated from '../Middlewares/Auth.js'; 
const router = express.Router(); 
router.get('/', ensureAuthenticated, (req, res) => {
    console.log('------ Logged In User Detail ------', req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "laptop",
            price: 50000
        }
    ]);
});

export default router; 
