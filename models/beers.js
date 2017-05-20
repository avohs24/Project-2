module.exports = function(sequelize, DataTypes) {
  var beers = sequelize.define("beers", {
    id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
   unique: true
 },
    beerID:{
      type: DataTypes.STRING,
      allowNull: false
    },
    beerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
      available: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
    },
});
return beers;
};
