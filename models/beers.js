module.exports = function(sequelize, DataTypes) {
  var beers = sequelize.define("beers", {
    breweryDbID:{
      type: DataTypes.STRING,
      allowNull: false
    }
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
