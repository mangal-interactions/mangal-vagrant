"use strict";

module.exports = function(sequelize, DataTypes) {
    var attribute = sequelize.define('attribute', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the trait or environmental variable measured"
        },
        table_owner: {
          type: DataTypes.ENUM,
          allowNull: false,
          comment: 'Name of table which owns this attribute',
          values: [
              "environments",
              "traits",
              "interactions"
          ]
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Description of the attribute"
        },
        unit: {
            type: DataTypes.STRING,
            comment: "Unit of the attribute"
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                attribute.hasMany(models.environment, {
                    onDelete: 'cascade',
                    foreignKey: 'attr_id'
                }),
                attribute.hasMany(models.interaction, {
                    onDelete: 'cascade',
                    foreignKey: 'attr_id'
                }),
                attribute.hasMany(models.trait, {
                    onDelete: 'cascade',
                    foreignKey: 'attr_id'
                })
            }
        }
    });

    return attribute
};
