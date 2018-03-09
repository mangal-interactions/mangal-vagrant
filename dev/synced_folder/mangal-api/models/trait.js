"use strict";

module.exports = function(sequelize, DataTypes) {
    var trait = sequelize.define('trait', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the trait collected"
        },
        date:{
          type: DataTypes.DATEONLY,
          comment: "When the trait has been measured"
        },
        attr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Unique Identifier to retrieve the name of the attribute/trait measured"
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Value of the trait/attribute"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the trait and his measurement"
        },
    })

    return trait

};
