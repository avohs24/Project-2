module.exports = function(sequelize, DataTypes) {
  var clientBrewery = sequelize.define("clientBrewery", {
    clBrRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },     
    {

          classMethods: {
            associate: function(models) {

              clientBrewery.belongsTo(models.client, {
                foreignKey: {
                  name: "Client ID",
                  allowNull: false
                }
              });
              clientBrewery.belongsTo(models.location, {
                foreignKey: {
                  name: "Brewery ID",
                  allowNull: false
                }
              });
            }
          }
        }
      );
  return clientBrewery;
};
