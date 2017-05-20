module.exports = function(sequelize, DataTypes) {
  var beerBrewery = sequelize.define("beerBrewery", {
    beBrRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },     {

        classMethods: {
          associate: function(models) {

            beerBrewery.belongsTo(models.beers, {
              foreignKey: {
                name: "BeerID",
                allowNull: false
              }
            });
            beerBrewery.belongsTo(models.location, {
              foreignKey: {
                name: "BreweryID",
                allowNull: false
              }
            });
          }
        }
      }
  );
  return beerBrewery;
};
