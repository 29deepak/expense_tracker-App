const User = require('../modals/user');

exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        if (name && email && password) {
            const user = await User.create({ name, email, password })
            return res.status(201).json({ msg: "user created sucessfully" })
        }

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findAll({ where: { email } })
        console.log(user)
        if (user) {
            if (user[0].password === password) {
                return res.status(200).json(user[0])
            }
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}