import { User } from '../model/user.model.js'

export const UserRepository = {
    findByEmail: (email) => User.findOne({ email }),
    findByName: (name) => User.findOne({ name }),
    create: (userData) => new User(userData).save()
};
