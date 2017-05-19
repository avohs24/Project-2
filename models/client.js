module.exports = function(sequelize, DataTypes) {
  var client = sequelize.define("client", {
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
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 50]
        }
    },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 50]
        }
    },
      state: {
        type: DataType.STRING,
        allowNull: true,
        validate: {
          len: [2, 2]
        }
    },
});
return client;
};
