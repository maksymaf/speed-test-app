const express = require('express');
const router = express.Router();
const TextController = require('../controllers/textController');

router.post('/add-text', new TextController().addText);
router.get('/', new TextController().getTexts);
router.get('/random-text', new TextController().getRandomText);
router.delete('/', new TextController().deleteText);
router.patch('/', new TextController().patchText);

module.exports = router
