"use strict";

module.exports = function(sequelize, DataTypes) {
    var taxo_back = sequelize.define('taxo_back', {
        name: {
            type: DataTypes.STRING,
            comment: "Scientific name of the recorded taxon",
            allowNull: false,
            unique: "uq_name"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the taxon"
        },
        ncbi: {
            type: DataTypes.INTEGER,
            comment: "Unique Identifier from the National Center for Biotechnology Information",
        },
        tsn: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Integrated Taxonomic Information System",
        },
        eol: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Encyclopedia of Life",
        },
        bold: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Barcode of Life Database",
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                "confirmed",
                "trophic species",
                "morphospecies",
                "nomen dubium",
                "nomen oblitum",
                "nomen nudum",
                "nomen novum",
                "nomen conservandum",
                "species inquirenda"
            ],
            comment: "Status of the taxonomic validation",
            defaultValue: "confirmed",
            allowNull: false
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                taxo_back.hasMany(models.taxon, {
                        onDelete: 'cascade',
                        foreignKey: 'taxo_id'
                })
            },
        }
    });

    return taxo_back

};
