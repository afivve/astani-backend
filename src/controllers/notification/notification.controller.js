const { Notification } = require('../../database/models')
const utils = require('../../utils')

module.exports = {

    getNotificationByUserId: async (req, res) => {
        try {

            const notifications = await Notification.findAll({
                where: {
                    userId: res.user.id
                },
                orderBy: {
                    id: 'desc'
                }
            })

            const notificationUnread = await Notification.findAll({
                where: {
                    userId: res.user.id,
                    read: false
                },
            })

            const createdAt = new Date(notifications.createdAt)
            const formattedCreatedAt = utils.formatWaktuIndonesia(createdAt)

            const data = {
                id: notifications.id,
                type: notifications.type,
                message: notifications.message,
                link: notifications.link,
                read: notifications.read,
                userId: notifications.userId,
                createdAt: formattedCreatedAt,
            }

            const totalNotificationUnread = notificationUnread.length


            return res.status(200).json(utils.apiSuccess("Berhasil mendapatkan notifikasi berdasarkan user id", notifications, { notificationUnread: totalNotificationUnread } /* data, { notificationUnread: totalNotificationUnread } */))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

    readNotificationByUserId: async (req, res) => {
        try {

            const notifications = await Notification.update(
                { read: true },
                {
                    where: {
                        userId: res.user.id
                    },
                }
            )

            if (!notifications) return res.status(404).json(utils.apiError("Tidak ada notifikasi"))

            return res.status(200).json(utils.apiSuccess("Notifikasi telah dibaca"))

        } catch (error) {
            console.log(error)
            return res.status(500).json(utils.apiError("Internal server error"))
        }
    },

}