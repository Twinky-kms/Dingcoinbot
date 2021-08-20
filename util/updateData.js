const request = require('request')

const cfg = require('./config.js')
const data = require('./data.js')
const helpers = require('./helpers.js')
const Exchange = require('../models/exchange')

const errmsg = "error'd rip: "

module.exports = {

  populateData: async function () {
    const cx = cfg.exchanges.cratex;
    const del = cfg.exchanges.delion;
    const dext = cfg.exchanges.dextrade;
    const sxc = cfg.exchanges.southxchange;
    const autx = cfg.exchanges.autradex;
    const btc = cfg.exchanges.btc;

    try {
      request(btc.base_url, (error, response, body) => {
        if (error) {
          console.log(errmsg, error)
          return;
        }
        if (!response.statusCode == 200) {
          console.log("bad status code")
          return;
        }
        if (!helpers.JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let d1 = JSON.parse(body.trim());
        us = data.rawPrices.usd;
        us.bitcoin = d1.bitcoin;
        us.litecoin = d1.litecoin;
        us.dogecoin = d1.dogecoin;
        us.auscash = d1['australia-cash']
      })
    } catch (e) {
      console.error(e);
    }

    //CRATEX
    for (var i = 0; i < cx.active_pairs.length; i++) {
      let pair = cx.pair_basic[i];
      try {
        request(cx.base_url + cx.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let obj = JSON.parse(body.trim());
          var keys = Object.keys(obj);
          let crat = new Exchange(pair, obj[keys[2]], obj[keys[5]], obj[keys[1]], obj[keys[3]]);
          data.rawPrices.cratex[pair] = crat;
        })
      } catch (e) {
        console.error(e);
      }
    }
    //DELION
    for (var i = 0; i < del.active_pairs.length; i++) {
      let b_pair = del.pair_basic[i];
      let a_pair = del.active_pairs[i];
      try {
        request(del.base_url + del.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let ddata = JSON.parse(body.trim())
          let d = ddata[a_pair]
          let dd = new Exchange(b_pair, d["lowest_ask"], d["latest"], d["highest_bid"], d["quote_volume"]);
          data.rawPrices.delion[b_pair] = dd;
        })
      } catch (e) {
        console.error(e);
      }
    }
    //DEXTRADE
    for (var i = 0; i < dext.active_pairs.length; i++) {
      let b_pair = dext.pair_basic[i];
      let a_pair = dext.active_pairs[i];
      let pt1;
      let pt2;
      try {
        request(dext.base_url + dext.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let d = JSON.parse(body.trim());
          pt1 = d;
        })
      } catch (e) {
        console.error(e);
      }

      try {
        request("https://api.dex-trade.com/v1/public/book?pair=" + dext.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let d = JSON.parse(body.trim());
          pt2 = d;
        })
      } catch (e) {
        console.error(e);
      }

      setTimeout(function () {
        try {
          let mrkstat = pt1;
          let ob = pt2;
          let buy = ob.data.buy
          let sell = ob.data.sell
          let bid, ask;
          for (key in buy[0]) {
            if (buy[0].hasOwnProperty(key)) {
              var value = buy[0][key];
              if (key == 'rate') {
                bid = value;
              }
            }
          }
          for (key in sell[0]) {
            if (sell[0].hasOwnProperty(key)) {
              var value = sell[0][key];
              if (key == 'rate') {
                ask = value;
              }
            }
          }
          let x = new Exchange(b_pair, ask, mrkstat.data.last, bid, mrkstat.data.volume_24H)
          data.rawPrices.dextrade[b_pair] = x;
        } catch (e) {
          console.error(e);
        }
      }, 5000);
    }
    //SOUTHXCHANGE
    for (var i = 0; i < sxc.active_pairs.length; i++) {
      let b_pair = sxc.pair_basic[i];
      let a_pair = sxc.active_pairs[i];
      try {
        request(sxc.base_url + sxc.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let d = JSON.parse(body.trim());
          let dd = new Exchange(b_pair, d.Ask, d.Last, d.Bid, d.Volume24Hr);
          data.rawPrices.southxchange[b_pair] = dd;
        })
      } catch (e) {
        console.error(e);
      }
    }
    //AUTRADEX
    for (var i = 0; i < autx.active_pairs.length; i++) {
      let b_pair = autx.pair_basic[i];
      let a_pair = autx.active_pairs[i];
      try {
        request(autx.base_url + autx.active_pairs[i], (error, response, body) => {
          if (error) {
            console.log(errmsg, error)
            return;
          }
          if (!response.statusCode == 200) {
            console.log("bad status code")
            return;
          }
          if (!helpers.JSONCheck(body.trim())) {
            console.log("json is bad mkay")
            return;
          }
          let d1 = JSON.parse(body.trim());
          let d = d1.ticker;
          let dd = new Exchange(b_pair, d.sell, d.last, d.buy, d.vol);
          data.rawPrices.autradex[b_pair] = dd;
        })
      } catch (e) {
        console.error(e);
      }
    }

    //setTimeout(function () { console.log(data.rawPrices); }, 30000);
  }
}