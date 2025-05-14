import { User } from '../models/user.model.js'

export const UserRepository = {
  findByEmail: async (email) => {
    return await User.findOne({ email })
  },
  create: async (userData) => {
    const user = new User(userData)
    return await user.save()
  },
}
