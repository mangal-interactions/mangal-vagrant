"use strict";

module.exports = function(sequelize, DataTypes) {
    var environment = sequelize.define('environment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the environmentale variable collected"
        },
        localisation: {
          type: DataTypes.GEOMETRY,
          comment: "Where the environmental variable has been measured",
          unique: "uq_env_const"
        },
        date:{
          type: DataTypes.DATEONLY,
          comment: "When the environmental variable has been measured",
          unique: "uq_env_const"
        },
        attr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Unique Identifier to retrieve the name of the attribute/variable measured",
            unique: "uq_env_const"
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Value of the environmental/attribute"
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                environment.hasMany(models.network, {
                    onDelete: 'cascade'
                }),
                environment.hasMany(models.interaction, {
                    onDelete: 'cascade'
                })
            }
        }
    });

    return environment
};
