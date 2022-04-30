const express = require('express');
const router = express.Router();
const {
  usersGet,
  usersUpdate,
  usersDelete,
  usersCreate,
} = require('./users.controllers');

const upload = require('../middleware/multer');

router.param('userId', async (req, res, next, userId) => {
  const user = await fetchMonument(+userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error('User Not Found');
    err.status = 404;
    next(err);
  }
});

router.get('/', usersGet);
router.post('/', upload.single('image'), usersCreate);

router.delete('/:userId', usersDelete);

router.put('/:userId', upload.single('image'), usersUpdate);

module.exports = router;
