"use strict";

module.exports = function(sequelize, DataTypes) {
    var ref = sequelize.define('ref', {
        doi: {
            type: DataTypes.STRING,
            comment: "DOI of the attached publication"
        },
        jstor: {
          type: DataTypes.STRING,
          comment: "JSTOR of the attached publication"
        },
        pmid: {
            type: DataTypes.STRING,
            comment: "PMID of the attached publication"
        },
        bibtex: {
            type: DataTypes.TEXT,
            comment: "bibtex of the attached publication"
        },
        url: {
            type: DataTypes.STRING,
            comment: "URL of the attached publication"
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                ref.hasMany(models.network, {
                    onDelete: 'cascade'
                }),
                ref.hasMany(models.environment, {
                    onDelete: 'cascade'
                }),
                ref.hasMany(models.trait, {
                    onDelete: 'cascade'
                }),
                ref.hasMany(models.interaction, {
                    onDelete: 'cascade'
                }),
                ref.hasMany(models.dataset, {
                    onDelete: 'cascade'
                })
            }
        }
    });

    return ref
};
