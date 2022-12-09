const express = require('express');
const router = express.Router();

const MailController = require('../../../controllers/people/handlebars');

router.get('/send', MailController.getSend);


module.exports = router;