const fill = require('es6-dynamic-template'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = manifest => fill(manifest, {
  BITBUCKET_ADDR: process.env.BITBUCKET_ADDR
});
