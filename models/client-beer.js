module.exports = function(sequelize, DataTypes) {
  var clientBeer = sequelize.define("clientBeer", {
    clBeRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
    },     {

          classMethods: {
            associate: function(models) {

              clientBeer.belongsToMany(models.client, {
                through: clientBeer,
                foreignKey: {
                  name: "Client ID",
                  allowNull: false
                }
              });
              clientBeer.belongsToMany(models.beers, {
                through: clientBeer,
                foreignKey: {
                  name: "Beer ID",
                  allowNull: false
                }
              });
            }
          }
        }
      );
  return clientBeer;
};
