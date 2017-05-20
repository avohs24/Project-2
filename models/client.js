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
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2, 2]
        }
    },
  });
return client;
};
