import * as nconf from 'nconf';

function setConfig(type: string, filePath: string) {
  return nconf.file(type, {
    file: `${__dirname}/${filePath}`,
    format: require('nconf-yaml'),
  });
}

export default function () {
  const debug = process.env.DEBUG === 'true';
  const env = process.env.NODE_ENV || 'development';

  if (debug || env === 'development') {
    setConfig(
      'local',
      debug ? 'config.local.yml' : '../../config/config.local.yml',
    );
  }

  setConfig('common', `config.${env}.yml`);
  setConfig('default', 'config.default.yml').overrides({
    port: process.env.PORT || nconf.get('port'),
  });

  nconf.defaults({ env, debug });

  if (debug || env === 'development') {
    console.log(JSON.stringify(nconf.get(), null, 2));
  }

  return nconf.get();
}
