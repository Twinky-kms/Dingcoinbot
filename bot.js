const Discord = require('discord.js')
const request = require('request')
const fetch = require("node-fetch");
global.fetch = fetch
global.Headers = fetch.Headers;
const config = require('./config.js')
const Exchange = require('./models/exchange')
const client = new Discord.Client({
  autoReconnect: true
});

var c = "876367898094997595";

let prices = {
  usd: {
    bitcoin: 0,
    litecoin: 0,
    dogecoin: 0,
    auscash: 0
  },
  cratex: {
    btc: {},
    ltc: {},
    doge: {},
  },
  delion: {
    btc: {},
    doge: {},
  },
  dextrade: {
    btc: {},
    usdt: {},
  },
  southxchange: {
    btc: {},
    ltc: {},
  },
  autradex: {
    btc: {},
    ltc: {},
    doge: {},
    aus: {}
  }
};

let calcUSD = (btc, usd) => {
  return parseFloat(btc * usd).toFixed(8);
}

function buildMessage() {
  console.log("building message...")
  return new Promise(resolve => {
    setTimeout(function() {
      price = prices;
      cratex = price.cratex;
      delion = price.delion;
      dextrade = price.dextrade;
      southxchange = price.southxchange;
      autradex = price.autradex;
      usd = price.usd;

      let msg2send = new Discord.RichEmbed()
      .setAuthor(config.coinName + " Markets")
      .setColor('#00AE96')
      .setDescription(":chart_with_upwards_trend: Current " + config.ticker + " prices.")
      .setTimestamp()
      .addField("---> Cratex exchange <---", "[link](https://cratex.io/)")
      .addField("Cratex (DINGO/BTC): ", "A: " + parseFloat(cratex.btc.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(cratex.btc.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(cratex.btc.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.btc.bid), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + cratex.btc.volume + " " + config.ticker + "\n", true)
      .addField("Cratex (DINGO/LTC): ", "A: " + parseFloat(cratex.ltc.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.ltc.ask), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(cratex.ltc.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.ltc.last), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(cratex.ltc.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.ltc.bid), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + cratex.ltc.volume + " " + config.ticker + "\n", true)
      .addField("Cratex (DINGO/DOGE): ", "A: " + parseFloat(cratex.doge.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.doge.ask), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(cratex.doge.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(cratex.doge.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(cratex.doge.bid), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + cratex.doge.volume + " " + config.ticker + "\n", true)
      .addField("---> Delion exchange <---", "[link](https://dex.delion.online/)")
      .addField("Delion (DINGO/BTC): ", "A: " + parseFloat(delion.btc.ask).toFixed(10) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(delion.btc.last).toFixed(10) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(delion.btc.bid).toFixed(10) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(delion.btc.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("Delion (DINGO/DOGE): ", "A: " + parseFloat(delion.doge.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.doge.ask), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(delion.doge.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(delion.doge.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(delion.doge.bid), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + delion.doge.volume + " " + config.ticker + "\n", true)
      .addField("---> Dex-Trade exchange <---", "[link](https://dex-trade.com/)")
      .addField("Dex-Trade (DINGO/BTC): ", "A: " + Number.parseFloat(dextrade.btc.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(dextrade.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(dextrade.btc.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(dextrade.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(dextrade.btc.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(dextrade.btc.bid), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + dextrade.btc.volume + " " + config.ticker + "\n", true)
      .addField("Dex-Trade (DINGO/USDT): ", "A: " + dextrade.usdt.ask + "\n" +
        "L: " + parseFloat(dextrade.usdt.last).toFixed(8) + "\n" +
        "B: " + parseFloat(dextrade.usdt.bid).toFixed(8) + "\n" +
        "V: " + parseFloat(dextrade.usdt.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("---> Southxchange exchange <---", "[link](https://main.southxchange.com/)")
      .addField("Southxchange (DINGO/BTC): ", "A: " + Number.parseFloat(southxchange.btc.ask).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(southxchange.btc.last).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(southxchange.btc.bid).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.btc.bid), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + southxchange.btc.volume + " " + config.ticker + "\n", true)
      .addField("Southxchange (DINGO/LTC): ", "A: " + Number.parseFloat(southxchange.ltc.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.ltc.ask), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(southxchange.ltc.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.ltc.last), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(southxchange.ltc.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(southxchange.ltc.bid), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(southxchange.ltc.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("---> Autradex exchange <---", "[link](https://wallet.autradex.systems/)")
      .addField("Autradex (DINGO/BTC): ", "A: " + Number.parseFloat(autradex.btc.ask).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(autradex.btc.last).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(autradex.btc.bid).toFixed(9) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.btc.bid), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(autradex.btc.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("Autradex (DINGO/LTC): ", "A: " + Number.parseFloat(autradex.ltc.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.ltc.ask), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(autradex.ltc.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.ltc.last), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(autradex.ltc.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.ltc.bid), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(autradex.ltc.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("Autradex (DINGO/DOGE): ", "A: " + Number.parseFloat(autradex.doge.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.doge.bid), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(autradex.doge.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(autradex.doge.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.doge.bid), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(autradex.doge.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("Autradex (DINGO/AUS): ", "A: " + Number.parseFloat(autradex.aus.ask).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.aus.ask), Number.parseFloat(usd.auscash.usd)) + ")" + "\n" +
        " \n" +
        "L: " + parseFloat(autradex.aus.last).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.aus.last), Number.parseFloat(usd.auscash.usd)) + ")" + "\n" +
        " \n" +
        "B: " + parseFloat(autradex.aus.bid).toFixed(8) + "\n" +
        " ($ " + calcUSD(Number.parseFloat(autradex.aus.bid), Number.parseFloat(usd.auscash.usd)) + ")" + "\n" +
        " \n" +
        "V: " + parseFloat(autradex.aus.volume).toFixed(0) + " " + config.ticker + "\n", true)
      resolve(msg2send)
    }, 500)
  })
}

client.on('ready', () => {
  console.log('> DingoBot launching')
  console.log('>_ ')
  const chan = client.channels.get(c)

  async function fillData() {
    await(populateData())
  }
  fillData()

  async function deleteMessages() {
    await (chan.fetchMessages({ limit: 100 }))
      .then(message => {
        message.forEach(element => {
          element.delete()
        });
      })
      .catch(console.error);
  }

  async function sendMessage() {
    var built = await(buildMessage())
    .catch(console.error)
    .then(built => {
      console.log("message sent")
      chan.send(built)
    })
  }

  setTimeout(async function(){
    deleteMessages();
    await(timer(100))
    sendMessage();
  }, 20 * 1000)
})

client.login(config.discordtoken)



async function JSONCheck(data) {
  try {
    //console.log(data);
    JSON.parse(data);
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}

async function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function format_numbers(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function populateData() {
  const cx = config.exchanges.cratex;
  const del = config.exchanges.delion;
  const dext = config.exchanges.dextrade;
  const sxc = config.exchanges.southxchange;
  const autx = config.exchanges.autradex;
  const usd = config.exchanges.usd;

  try {
    request(usd.base_url, (error, response, body) => {
      if (error) {
        console.log(errmsg, error)
        return;
      }
      if (!response.statusCode == 200) {
        console.log("bad status code")
        return;
      }
      if (!JSONCheck(body.trim())) {
        console.log("json is bad mkay")
        return;
      }
      let d1 = JSON.parse(body.trim());
      us = prices.usd;
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
        if (!JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let obj = JSON.parse(body.trim());
        var keys = Object.keys(obj);
        let crat = new Exchange(pair, obj[keys[2]], obj[keys[5]], obj[keys[1]], obj[keys[3]]);
        prices.cratex[pair] = crat;
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
        if (!JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let ddata = JSON.parse(body.trim())
        let d = ddata[a_pair]
        let dd = new Exchange(b_pair, d["lowest_ask"], d["latest"], d["highest_bid"], d["quote_volume"]);
        prices.delion[b_pair] = dd;
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
        if (!JSONCheck(body.trim())) {
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
        if (!JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let c = JSON.parse(body.trim());
        pt2 = c;
      })
    } catch (e) {
      console.error(e);
    }

    setTimeout(function () {
      try {
        let mrkstat = pt1.data;
        let ob = pt2;
        let buy = ob.data.buy
        let sell = ob.data.sell
        let bid, ask;
        //console.log(pt1)
        //console.log(pt2)
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
        let x = new Exchange(b_pair, ask, mrkstat.last, bid, mrkstat.volume_24H)
        prices.dextrade[b_pair] = x;
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
        if (!JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let d = JSON.parse(body.trim());
        let dd = new Exchange(b_pair, d.Ask, d.Last, d.Bid, d.Volume24Hr);
        prices.southxchange[b_pair] = dd;
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
        if (!JSONCheck(body.trim())) {
          console.log("json is bad mkay")
          return;
        }
        let d1 = JSON.parse(body.trim());
        let d = d1.ticker;
        let dd = new Exchange(b_pair, d.sell, d.last, d.buy, d.vol);
        prices.autradex[b_pair] = dd;
      })
    } catch (e) {
      console.error(e);
    }
  }
  console.log("populateData done")
}
