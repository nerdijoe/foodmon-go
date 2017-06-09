const router = require('express').Router();
const interestController = require('../controllers/interest')
let helper = require('../helpers/auth_verify')

router.get('/', interestController.getAll)
router.get('/:id', helper.auth, interestController.getById)
router.post('/', helper.auth, interestController.insertOne)
// router.post('/bulk', helper.auth, interestController.insertBulk)
router.put('/:id', helper.auth, interestController.updateById)
router.delete('/:id', helper.auth, interestController.deleteById)

module.exports = router;
