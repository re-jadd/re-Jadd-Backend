const express = require('express');
const router = express.Router();


const sendRecycles = (req, res) => res.json();
const sendRecycle = (req, res) => res.json();
const sendSuccess = (req, res) => res.json({ message: 'success' });

router.get('/');
router.post('/');
router.put('/:id');
router.delete('/:id');



module.exports = router;