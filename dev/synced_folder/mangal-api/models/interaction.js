"use strict";

module.exports = function(sequelize, DataTypes) {
    var interaction = sequelize.define('interaction', {
        taxon_1: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the first taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        taxon_2: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the second taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        taxon_1_level: {
            type: DataTypes.ENUM,
            values: ["taxon", "population", "individual"],
            defaultValue: "taxon",
            allowNull: false
        },
        taxon_2_level: {
            type: DataTypes.ENUM,
            values: ["taxon", "population", "individual"],
            defaultValue: "taxon",
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            comment: "Date of the recorded interaction",
            unique: "uq_interac_const",
            allowNull: true
        },
        direction: {
            type: DataTypes.ENUM,
            comment: "Direction of the interaction",
            values: [
                "directed",
                "undirected",
                "unknown"
            ],
            defaultValue: "directed",
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            comment: "Interaction type",
            values: [
                "competition",
                "amensalism",
                "neutralism",
                "commensalism",
                "mutualism",
                "parasitism",
                "predation",
                "herbivory",
                "symbiosis",
                "scavenger",
                "unknown"
            ],
            defaultValue: "unknown"
        },
        method: {
            type: DataTypes.STRING(35),
            comment: "Method: observation, biblio, experimental"
            // TODO Add reference table
        },
        attr_id: {
            type: DataTypes.INTEGER,
            unique: "uq_interac_const",
            comment: "Unique Identifier to retrieve the name of the variable measured (if present)"
        },
        value: {
            type: DataTypes.FLOAT,
            comment: "Value of the attribute"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the interaction"
        },
        localisation: {
            type: DataTypes.GEOMETRY,
            comment: "Explicit localisation of the interaction"
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull:false,
            comment: "Is this available publicly? "
        }
    }, {
        underscored: true,
        classMethods: {
            validate: {
                bothAttrValue: function() {
                    if ((this.value === null) && (this.attr_id !== null)) {
                        throw new Error('Attribute set with no value')
                    } else if (((this.value !== null) && (this.attr_id === null))) {
                        throw new Error('Value set with no attribute')
                    }
                }
            }
        }
    })
    return interaction
};
