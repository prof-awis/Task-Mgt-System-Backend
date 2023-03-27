const  mongoose = require('mongoose')
const  bcrypt = require('bcrypt')

const authSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 4,
      },
      firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      }
    },
    {
      timestamps: true,
    }
  )



module.exports = mongoose.model('User', authSchema)