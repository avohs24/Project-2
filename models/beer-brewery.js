module.exports = function(sequelize, DataTypes) {
  var beerBrewery = sequelize.define("beerBrewery", {
    beBrRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },     {

        classMethods: {
          associate: function(models) {

            beerBrewery.belongsTo(models.beers, {
              foreignKey: {
                name: "beerID",
                allowNull: false
              }
            });
            beerBrewery.belongsTo(models.location, {
              foreignKey: {
                name: "breweryID",
                allowNull: false
              }
            });
          }
        }
      }
  );
  return beerBrewery;
};
