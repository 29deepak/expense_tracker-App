const Transaction = require('../modals/transaction')
const { Op } = require("sequelize")
const moment = require('moment')
exports.getAllTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        console.log(frequency, selectedDate)
        let startDate = moment().subtract(Number(frequency), "d").toDate()
        const userId = req.body.userId
        let user = await Transaction.findAll({
            order: [["updatedAt", "DESC"]],
            where: {
                userId: userId,
                // date: {
                //     [Op.gte]: startDate,
                // },
                ...(frequency !== "custom" ? {
                    date: {
                        [Op.gte]: startDate,
                    },
                } : {
                    date: {
                        [Op.between]: [selectedDate[0], selectedDate[1]],
                    },
                }),
                ...(type !== "all" && { type })
            }
        })
        return res.status(200).json(user)

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.addTransactions = async (req, res) => {
    try {
        console.log(req.body)
        let user = await Transaction.create(req.body)
        return res.status(201).json({ msg: "saved successfully" })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.editTransaction = async (req, res) => {
    try {
        console.log(req.body)
        await Transaction.update(req.body.payload, { where: { id: req.body.transactionId } })
        res.status(200).json("update succssfuly")
    }
    catch (err) {
        return res.status(500).json(err)
    }
}
exports.deleteTransaction = async (req, res) => {
    try {
        console.log(req.body)
        await Transaction.destroy({ where: { id: req.body.transactionId } })
        res.status(200).json("Deleted succssfuly")

    }
    catch (err) {
        return res.status(500).json(err)
    }
}