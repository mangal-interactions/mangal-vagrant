"use strict";

module.exports = function(sequelize, DataTypes) {
    var taxon = sequelize.define('taxon', {
        original_name: {
            type: DataTypes.STRING,
            comment: "Name of the recorded taxon in the publication",
            allowNull: false,
            unique: "uq_name_network"
        },
        network_id: {
            type: DataTypes.INTEGER,
            unique: "uq_name_network"
       }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                taxon.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'taxon_1'
                }),
                taxon.hasMany(models.interaction, {
                    onDelete: 'cascade',
                    foreignKey: 'taxon_2'
                }),
                taxon.hasMany(models.trait, {
                    onDelete: 'cascade',
                    foreignKey: 'taxon_id'
                })
            }
        }
    });

    return taxon

};
