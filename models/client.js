module.exports = function(sequelize, DataTypes) {
  var client = sequelize.define("client", {
    id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
   unique: true
 },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
    },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
    },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 2]
        }
    },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [5]
        }
      }
  });
return client;
};
