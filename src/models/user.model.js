import bcrypt from 'bcrypt'
import { DataTypes, Model, sequelize } from '@helpers/Database'

class User extends Model {
  getFullName () {
    return [this.firstName, this.lastName].join(' ')
  }

  validPassword (password) {
    return bcrypt.compare(password, this.password)
  }
}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      min: 2
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
      notNull: true
    }
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.STRING(8),
    allowNull: false,
    defaultValue: 'customer',
    validate: {
      isIn: [['admin', 'customer']],
      notNull: true,
      notEmpty: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}

User.init(schema, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10, 'a')
        user.password = await bcrypt.hash(user.password, salt)
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10, 'a')
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
})

export default User
