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
  hotbit: {
    usdt: {}
  },
  southxchange: {
    btc: {},
    ltc: {},
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
      hotbit = price.hotbit;
      usd = price.usd;

      let msg2send = new Discord.RichEmbed()
      .setAuthor(config.coinName + " Markets")
      .setColor('#00AE96')
      .setDescription(":chart_with_upwards_trend: Current " + config.ticker + " prices.")
      .setTimestamp()
      .addField("---> Cratex <---", "[link](https://cratex.io/)")
      .addField("Cratex (DINGO/BTC): ",
        "Last: " + parseFloat(cratex.btc.last).toFixed(8) + " BTC" + "\n" +
        " ($" + calcUSD(Number.parseFloat(cratex.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        "Volume: " + cratex.btc.volume + " " + config.ticker + "\n", true)
      .addField("Cratex (DINGO/LTC): ",
        "Last: " + parseFloat(cratex.ltc.last).toFixed(8) + " LTC" + "\n" +
        " ($" + calcUSD(Number.parseFloat(cratex.ltc.last), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        "Volume: " + cratex.ltc.volume + " " + config.ticker + "\n", true)
      .addField("Cratex (DINGO/DOGE): ",
        "Last: " + parseFloat(cratex.doge.last).toFixed(8) + " DOGE" +  "\n" +
        " ($" + calcUSD(Number.parseFloat(cratex.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        "Volume: " + cratex.doge.volume + " " + config.ticker + "\n", true)
      .addField("---> Delion <---", "[link](https://dex.delion.online/)")
      .addField("Delion (DINGO/BTC): ",
        "Last: " + parseFloat(delion.btc.last).toFixed(10) + " BTC" + "\n" +
        " ($" + calcUSD(Number.parseFloat(delion.btc.ask), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        "Volume: " + parseFloat(delion.btc.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("Delion (DINGO/DOGE): ",
        "Last: " + parseFloat(delion.doge.last).toFixed(8) + " DOGE" + "\n" +
        " ($" + calcUSD(Number.parseFloat(delion.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        "Volume: " + delion.doge.volume + " " + config.ticker + "\n", true)
      .addField("---> Dex-Trade <---", "[link](https://dex-trade.com/)")
      .addField("Dex-Trade (DINGO/BTC): ",
        "Last: " + parseFloat(dextrade.btc.last).toFixed(8) + " BTC" +  "\n" +
        " ($" + calcUSD(Number.parseFloat(dextrade.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        "Volume: " + dextrade.btc.volume + " " + config.ticker + "\n", true)
      .addField("Dex-Trade (DINGO/USDT): ",
        "Last: $" + parseFloat(dextrade.usdt.last).toFixed(8) + " USDT" + "\n" +
        "Volume: " + parseFloat(dextrade.usdt.volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("---> Hotbit <---", "[link](https://hotbit.io/)")
      .addField("Hotbit (DINGO/USDT): ",
          "Last: $" + parseFloat(hotbit["USDT"].last).toFixed(8) + " USDT" + "\n" +
          "Volume: " + parseFloat(hotbit["USDT"].volume).toFixed(0) + " " + config.ticker + "\n", true)
      .addField("---> Southxchange <---", "[link](https://main.southxchange.com/)")
      .addField("Southxchange (DINGO/BTC): ",
        "Last: " + parseFloat(southxchange.btc.last).toFixed(9) + " BTC" + "\n" +
        " ($" + calcUSD(Number.parseFloat(southxchange.btc.last), Number.parseInt(usd.bitcoin.usd)) + ")" + "\n" +
        " \n" +
        "Volume: " + southxchange.btc.volume + " " + config.ticker + "\n", true)
      .addField("Southxchange (DINGO/LTC): ",
        "Last: " + parseFloat(southxchange.ltc.last).toFixed(8) + " LTC" +  "\n" +
        " ($" + calcUSD(Number.parseFloat(southxchange.ltc.last), Number.parseInt(usd.litecoin.usd)) + ")" + "\n" +
        " \n" +
        "Volume: " + parseFloat(southxchange.ltc.volume).toFixed(0) + " " + config.ticker + "\n", true)
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
    await(timer(2500))
    process.exit()
  }, 30 * 1000)
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
        console.log(error)
        return;
      }
      if (response.statusCode != 200) {
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
          console.error(error)          
          return;
        }
        if (response.statusCode != 200) {
          console.log("bad status code")
          return;
        }
        if (!JSONCheck(body.trim())) {
        console.log("json error")
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
          console.error(error)          
          return;
        }
        if (response.statusCode != 200) {
          console.log("bad status code")
          return;
        }
        if (!JSONCheck(body.trim())) {
        console.log("json error")
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
          console.error(error)          
          return;
        }
        if (response.statusCode != 200) {
          console.log("bad status code")
          return;
        }
        if (!JSONCheck(body.trim())) {
        console.log("json error")
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
          console.error(error)          
          return;
        }
        if (response.statusCode != 200) {
          console.log("bad status code")
          return;
        }
        if (!JSONCheck(body.trim())) {
        console.log("json error")
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
    }, 9000);
  }
  //SOUTHXCHANGE
  for (var i = 0; i < sxc.active_pairs.length; i++) {
    let b_pair = sxc.pair_basic[i];
    let a_pair = sxc.active_pairs[i];
    try {
      request(sxc.base_url + sxc.active_pairs[i], (error, response, body) => {
        if (error) {
          console.error(error)          
          return;
        }
        if (response.statusCode != 200) {
          console.log("bad status code")
          return;
        }
        if (!JSONCheck(body.trim())) {
        console.log("json error")
          return;
        }
        let d = JSON.parse(body.trim());
        let dd = new Exchange(b_pair, d.Ask, d.Last, d.Bid, d.Volume24Hr);
        prices.southxchange[b_pair] = dd;
      })
    } catch (e) {
      console.log(error)
    }
  }
  //Hotbit
  try {
    request("https://api.hotbit.io/api/v1/market.status?market=DINGO/USDT&period=86400", (error, response, body) => {
      if(error){
        console.error(error)
        return;    
      }
      if (response.statusCode != 200) {
        console.log("bad status code")
      }
      if (!JSONCheck(body.trim())) {
        console.log("json error")
        return;
      }
      let d = JSON.parse(body.trim());
      let dd = new Exchange("USDT", 0, d.result.last, 0, d.result.base_volume)
      prices.hotbit["USDT"] = dd;
    })
  }
  catch(e) {
    console.error(e)
  }
  console.log("populateData done")
}
