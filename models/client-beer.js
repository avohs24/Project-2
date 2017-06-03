module.exports = function(sequelize, DataTypes) {
  var clientBeer = sequelize.define("clientBeer", {
    clBeRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
    },     {

          classMethods: {
            associate: function(models) {

              clientBeer.belongsTo(models.client, {
                foreignKey: {
                  name: "clientID",
                  allowNull: false
                }
              });
              clientBeer.belongsTo(models.beers, {
                foreignKey: {
                  name: "beerID",
                  allowNull: false
                }
              });
            }
          }
        }
      );
  return clientBeer;
};
