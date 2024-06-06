const { User } = require('../database/models')

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    async findOrCreateUser(data) {
        const [user, created] = await User.findOrCreate({
            where: { email: data.email },
            defaults: data
        })
        return { user, created }
    }
}

module.exports = new UserRepository()