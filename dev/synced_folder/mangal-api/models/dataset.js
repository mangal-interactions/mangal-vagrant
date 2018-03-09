"use strict";

module.exports = function(sequelize, DataTypes) {
    var dataset = sequelize.define('dataset', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the collected dataset"
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "Collection date"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the dataset collected"
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            comment: "Is this available publicly? "
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                dataset.hasMany(models.network, {
                    onDelete: 'cascade'
                })
            }
        }
    });

    return dataset
};
