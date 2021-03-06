import rp from "request-promise";
import { currencyMapper } from "./currencyMapper";

const cbiCompositionUrl = "https://index-am.coinbase.com//v1/cbi/composition.json";

// https://index-am.coinbase.com//v1/cbi/composition.json
// returns [{"name":"Bitcoin","abbr":"btc","value":67.72362223258995},{"name":"Ethereum","abbr":"eth","value":23.147138703100914},{"name":"Bitcoin Cash","abbr":"bch","value":6.759463195929994},{"name":"Litecoin","abbr":"ltc","value":2.369775868379143}]

const options = {
  uri: cbiCompositionUrl,
  json: true
};

function getWeights() {
  return rp(options)
    .then(data => {
      return data.map(({ name, value }) => ({
        productName: currencyMapper[name],
        amount: parseFloat(value) / 100
      }));
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  getWeights
};
