const express = require('express')
const router = express.Router()
const Accounts = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.json(data)
  } catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.getById(req.params.id)
    res.json(data)
  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.create(req.body)
    res.status(data)
  } catch (err){
    next(err)
  }
})

router.put('/:id',checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.update(req.params.id, req.body)
    res.status(data)
  } catch (err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Accounts.remove(req.params.id)
    res.status(data)
  } catch (err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
