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
    }
});
return beers;
};
