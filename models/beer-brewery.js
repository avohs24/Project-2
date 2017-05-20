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
                name: "Beer ID",
                allowNull: false
              }
            });
            beerBrewery.belongsTo(models.location, {
              foreignKey: {
                name: "Brewery ID",
                allowNull: false
              }
            });
          }
        }
      }
  );
  return beerBrewery;
};
