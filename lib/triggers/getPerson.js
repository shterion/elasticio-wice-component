const request = require('request-promise');

const wice = require('./../actions/wice');
const config = require('./../../config/config');

const cfg = config.getEnvironment();

let input = {
  rowid: 412148
};

wice.createSession(cfg, async () => {
  if (cfg.cookie) {

    let uri = `${cfg.path}/plugin/wp_elasticio_backend/json?method=get_person&cookie=${cfg.cookie}&pkey=${input.rowid}`;
    console.log(uri);

    request.get(uri).then((res) => {
      let resObj = JSON.parse(res);

      let customObject = {
        name: resObj.name,
        firstname: resObj.firstname
      };

      console.log(customObject);
      // for (const person of Object.keys(resObj.loop_addresses)) {
      //   if (resObj.loop_addresses[person].rowid == input.rowid) {
      //     console.log(resObj.loop_addresses[person]);
      //     return resObj.loop_addresses[person];
      //   }
      // }

    }, (err) => {
      if (err) {
        console.log(`ERROR: ${err}`);
      }
    }).catch((e) => {
      console.log(`ERROR: ${e}`);
    });

    // try {
    //   let persons = await request.get(uri);
    //   let resObj = JSON.parse(persons);
    //
    //   for (const person of Object.keys(resObj.loop_addresses)) {
    //     if (resObj.loop_addresses[person].rowid == input.rowid) {
    //       console.log(resObj.loop_addresses[person]);
    //       return resObj.loop_addresses[person];
    //     }
    //   }
    //
    //   // let getUser = JSON.stringify(input);
    //   // let uri = `${cfg.path}/plugin/wp_elasticio_backend/json?method=get_person&cookie=${cfg.cookie}&data=${getUser}`;
    //   //
    //   // try {
    //   //   let getPerson = await request.get(uri);
    //   //   console.log(JSON.parse(getPerson));
    //
    // } catch (e) {
    //   console.log(`ERROR: ${e}`);
    // }

  } else {
    console.log('ERROR: No cookie found...');
  }
});
