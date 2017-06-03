module.exports = function(sequelize, DataTypes) {
  var clientBrewery = sequelize.define("clientBrewery", {
    clBrRelation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
    {

          classMethods: {
            associate: function(models) {

              clientBrewery.belongsTo(models.client, {
                foreignKey: {
                  name: "clientID",
                  allowNull: false
                }
              });
              clientBrewery.belongsTo(models.location, {
                foreignKey: {
                  name: "breweryID",
                  allowNull: false
                }
              });
            }
          }
        }
      );
  return clientBrewery;
};
