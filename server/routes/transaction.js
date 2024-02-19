const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transaction')
router.post('/add-transaction', transactionController.addTransactions)
router.post('/get-transaction', transactionController.getAllTransactions)
router.post('/edit-transaction', transactionController.editTransaction)
router.post('/delete-transaction', transactionController.deleteTransaction)

module.exports = router