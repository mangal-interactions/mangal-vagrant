"use strict";

module.exports = function(sequelize, DataTypes) {
    var network = sequelize.define('network', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the collected network"
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "Collection date"
        },
        localisation: {
            type: DataTypes.GEOMETRY
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the network collected"
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            comment: "Is this network is available publicly?"
        },
        all_interactions: {
          type: DataTypes.BOOLEAN,
          comment: "Is the network recording ALL presence AND absence of interactions",
          defaultValue: false,
          allowNull:false
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                network.hasMany(models.network, {
                    onDelete: 'cascade'
                })
            },
            indexes: [{
                name: 'idx_network_date',
                method: 'BTREE',
                fields: ['date']
            }, {
                name: 'idx_network_name',
                method: 'BTREE',
                fields: ['name']
            }, {

            }]
        }
    });
    return network
};
