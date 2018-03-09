var epilogue = require('epilogue');
var db = require('../models');
var middlewares = require('./middlewares')

// Init Epilogue
var initialize = function(app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize
  });

  // Create REST resources
  var attributeResource = epilogue.resource({
    model: db.attribute,
    endpoints: ['/api/v0/attributes', '/api/v0/attribute/:id']
  });

  var refResource = epilogue.resource({
    model: db.ref,
    endpoints: ['/api/v0/refs', '/api/v0/ref/:id']
  });

  var userResource = epilogue.resource({
    model: db.user,
    endpoints: ['/api/v0/users', '/api/v0/user/:id']
  });

  var traitResource = epilogue.resource({
    model: db.trait,
    endpoints: ['/api/v0/traits', '/api/v0/trait/:id']
  });

  var environmentResource = epilogue.resource({
    model: db.environment,
    endpoints: ['/api/v0/environments', '/api/v0/environment/:id']
  });

  var taxonResource = epilogue.resource({
    model: db.taxon,
    endpoints: ['/api/v0/taxons', '/api/v0/taxon/:id']
  });

  var datasetResource = epilogue.resource({
    model: db.dataset,
    endpoints: ['/api/v0/datasets', '/api/v0/dataset/:id']
  });

  var networkResource = epilogue.resource({
    model: db.network,
    endpoints: ['/api/v0/networks', '/api/v0/network/:id']
  });

  var interactionResource = epilogue.resource({
    model: db.interaction,
    endpoints: ['/api/v0/interactions', '/api/v0/interaction/:id']
  });

  var taxo_backResource = epilogue.resource({
    model: db.taxo_back,
    endpoints: ['/api/v0/taxo_backs', '/api/v0/taxo_back/:id']
  });

  // Protections ressources with middlewares
  attributeResource.use(middlewares);
  refResource.use(middlewares);
  userResource.use(middlewares);
  traitResource.use(middlewares);
  environmentResource.use(middlewares);
  taxonResource.use(middlewares);
  datasetResource.use(middlewares);
  networkResource.use(middlewares);
  interactionResource.use(middlewares);

};

module.exports = {
  initialize: initialize
};
