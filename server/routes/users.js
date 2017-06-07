const router = require('express').Router();
const userController = require('../controllers/users')
let helper = require('../helpers/auth_verify')

router.get('/', helper.auth, userController.getAll)
router.get('/:id', helper.auth, userController.getById)
router.put('/:id', helper.auth, userController.updateById)
router.delete('/:id', helper.auth, userController.deleteById)

module.exports = router;
