const express = require('express');
const router = express.Router();

const advert_controller = require('../controllers/advertController');

//
// ─── ADVERTS_ROUTES ─────────────────────────────────────────────────────────────
//

router.get('/', advert_controller.list);

router.post('/', advert_controller.post);

router.get('/:id', advert_controller.show);

router.delete('/:id', advert_controller.delete);

router.put('/:id', advert_controller.update);

module.exports = router;