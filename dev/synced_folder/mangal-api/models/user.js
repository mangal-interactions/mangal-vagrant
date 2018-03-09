"use strict";

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      orcid: {
          type: DataTypes.STRING,
          unique: true
      },
      organization: {
          type: DataTypes.STRING
      },
      access_token: {
          type: DataTypes.STRING
      },
      type: {
          type: DataTypes.ENUM,
          values: [
              "user",
              "curator",
              "administrator"
          ],
          defaultValue: "user",
          allowNull: false,
          comment: "The status of the user. Can be user, curator, or administrator."
      }
  }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                    user.hasMany(models.network, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.interaction, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.dataset, {
                        onDelete: 'cascade'
                    })
            }
        }
    })

    return user

};
