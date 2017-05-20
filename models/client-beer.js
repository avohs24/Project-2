module.exports = function(sequelize, DataTypes) {
  var clientBeer = sequelize.define("clientBeer", {
    clBeRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
    },     {

          classMethods: {
            associate: function(models) {

              clientBeer.belongsTo(models.client, {
                foreignKey: {
                  name: "ClientID",
                  allowNull: false
                }
              });
              clientBeer.belongsTo(models.beers, {
                foreignKey: {
                  name: "BeerID",
                  allowNull: false
                }
              });
            }
          }
        }
      );
  return clientBeer;
};
