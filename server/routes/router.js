var express = require('express');
var router = express.Router();

const canteen = require('../api/canteen');
const hostel = require('../api/hostel');

router.get('/hostel/', hostel.getHostel);
router.get('/hostel/:hostel_id/', hostel.getHostel);
router.post('/hostel/', hostel.createHostel);

router.get('/canteen/', canteen.getCanteen);
router.get('/canteen/:canteen_id/', canteen.getCanteen);
router.post('/canteen/', canteen.createCanteen);
router.put('/canteen/', canteen.updateCanteen);

router.get('/canteen/check/:canteen_id/', canteen.checkCanteenActive);
router.post('/canteen/active/', canteen.makeCanteenActive);
router.post('/canteen/inactive/', canteen.makeCanteenInactive);



module.exports = router;
