var express = require('express');
var router = express.Router();

const canteen = require('../api/canteen');
const hostel = require('../api/hostel');

router.get('/hostel/', hostel.getHostel);
router.get('/hostel/:id', hostel.getHostel);
router.post('/hostel/', hostel.createHostel);

router.get('/canteen/', canteen.getCanteen);
router.get('/canteen/:id', canteen.getCanteen);
router.post('/canteen/', canteen.createCanteen);

module.exports = router;
