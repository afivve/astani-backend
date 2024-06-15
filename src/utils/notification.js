const { User, Notification } = require('../database/models')

module.exports = {
    createNotification: async (type, msg, link, read, userId) => {
        try {

            const checkUser = await User.findByPk(userId)

            if (!checkUser) return false

            await Notification.create({
                type: type,
                message: msg,
                link: link,
                read: read,
                userId: userId
            })

            return true

        } catch (error) {
            console.log(error)
            return false
        }
    },
}