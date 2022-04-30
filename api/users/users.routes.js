const express = require('express');
const router = express.Router();
const {
  usersGet,
  usersUpdate,
  usersDelete,
  usersCreate,
} = require('./users.controllers');

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
router.post('/', usersCreate);

router.delete('/:userId', usersDelete);

router.put('/:userId', usersUpdate);

module.exports = router;
