module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define("location", {
    id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
   unique: true
 },
    breweryDbID:{
      type: DataTypes.STRING,
      allowNull: false
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 50]
      }
  },
});
return location;
};
