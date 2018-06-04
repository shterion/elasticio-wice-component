const request = require('request-promise');
const wice = require('./../actions/wice');
const config = require('./../../config/config');
const cfg = config.getEnvironment();

wice.createSession(cfg, () => {
  if (cfg.cookie) {
    const uri = `${cfg.path}/plugin/wp_elasticio_backend/json?method=get_all_articles&cookie=${cfg.cookie}`;
    request.get(uri)
    .then((res) => {
      let resObj = JSON.parse(res);
      console.log(JSON.stringify(resObj.loop_articles, undefined, 2));
      return resObj;
    }).catch((e) => {
      console.log(`ERROR: ${e}`);
    });
  } else {
    console.log('ERROR: No cookie found...');
    return;
  }
});