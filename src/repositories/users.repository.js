import { User } from '../model/user.model.js'

export const UserRepository = {
  findByEmail: (email) => User.findOne({ email }),
  create: (userData) => new User(userData).save(),
}
