/* eslint-disable import/first */
/* eslint-disable n/no-path-concat */
import moduleAlias from 'module-alias'
moduleAlias.addAliases({
  '@middlewares': `${__dirname}/middlewares`,
  '@controllers': `${__dirname}/controllers`,
  '@repos': `${__dirname}/repos`,
  '@models': `${__dirname}/models`,
  '@constants': `${__dirname}/constants`,
  '@utils': `${__dirname}/utils`,
  '@config': `${__dirname}/config`,
  '@routes': `${__dirname}/routes`,
  '@listeners': `${__dirname}/listeners`,
  '@interfaces': `${__dirname}/interfaces`,
  '@tests': `${__dirname}/__tests__`
})

import '@config/app'
