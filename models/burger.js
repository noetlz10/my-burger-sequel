module.exports = function(sequelize, DataTypes) {
    //Define the Burger Sequelize model
    var Burger = sequelize.define("Burger", {
        //the name identifying the burger
        name: {
            type: DataTypes.String,
            allowNull: false
        },
        //The availability boolean
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Burger;
};