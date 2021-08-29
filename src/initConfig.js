const Consul = require('consul');
const get = require('lodash/get');
const find = require('lodash/find');
const Handlebars = require('handlebars');
const fs = require('fs');

const consulPath =
  'development/application-mode/5854562c-21be-4f86-86f2-19b276d0f44d';

const getConsulConfig = async () => {
  const consul = new Consul({
    promisify: true,
  });

  // load consul configuration
  try {
    return await consul.kv.get({
      recurse: true,
      key: consulPath,
      separator: '',
    });
  } catch (error) {
    throw new Error('Consul connection error');
  }
};

const getCapabilities = (config) => {
  return config
    .filter((o) => {
      return o.Key.startsWith(consulPath + '/capabilities');
    })
    .map((Capability) => {
      const Value = JSON.parse(Capability.Value);
      return {
        ...Capability,
        Value,
      };
    });
};

const getIntercom = (capabilities) => {
  const intercom = find(capabilities, {
    Key: `${consulPath}/capabilities/intercom/config`,
  });
  return intercom.Value.intercom_app_id;
};

const getHeader = (config) => {
  const header = find(config, {
    Key: `${consulPath}/html_metadata`,
  });

  return JSON.parse(header.Value);
};

(async function init() {
  try {
    const consulConfig = await getConsulConfig();
    const capabilities = getCapabilities(consulConfig);
    const intercomId = getIntercom(capabilities);
    const header = getHeader(consulConfig);

    const headerTemplate = fs
      .readFileSync(__dirname + '/templates/header.hbs')
      .toString('utf-8');

    Handlebars.registerPartial('headerTemplate', headerTemplate);

    const windowTemplate = fs
      .readFileSync(__dirname + '/templates/window.hbs')
      .toString('utf-8');

    Handlebars.registerPartial('windowTemplate', windowTemplate);

    const mainTemplate = Handlebars.compile(
      fs.readFileSync(`${__dirname}/templates/main.hbs`, { encoding: 'utf8' }),
      { compat: true },
    );

    const config = {
      apiBaseUrl: 'www.yahoo.com',
      filePickerApiKey: '32312312',
      intercom: {
        id: intercomId,
      },
      capabilities,
    };

    const c = mainTemplate({ header: header, config });

    fs.writeFile('public/index.html', c, 'UTF-8', () => {
      console.log('Done');
    });
  } catch (error) {
    console.log('ERROR', error);
  }

  // write html to nginx directory with app-mode folder
  // assign json to a window.config value
  //create nginx config file to point to it
})();
