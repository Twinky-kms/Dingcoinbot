//depends
const Discord = require('discord.js')
const request = require('request')
const fs = require('fs')
const BigNumber = require('bignumber.js')
const fetch = require("node-fetch");
global.fetch = fetch
global.Headers = fetch.Headers;
const client = new Discord.Client({
  autoReconnect: true
})

//imports
const config = require('./util/config.js')
const data = require('./util/data.js')
const updateData = require('./util/updateData.js')

let calcUSD = (btc, usd) => {
  //console.log(btc, usd)
  return parseFloat(btc * usd).toFixed(8);
}

client.on('message', message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command == 'price') {
    if (message.channel.id === config.pricechannel) {
      client.user.setActivity("Watching prices... 👀")
      //this can be improved... alot.
      loopTime = 480 * 1000;
      price = data.prices;
      cratex = price.cratex;
      delion = price.delion;
      dextrade = price.dextrade;
      southxchange = price.southxchange;
      autradex = price.autradex;
      usd = price.usd;

      var embed = new Discord.RichEmbed()
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
        // .addField("Delion (DINGO/DOGE): ", "A: " + parseFloat(delion.doge.ask).toFixed(8) + "\n" +
        //   " ($ " + calcUSD(Number.parseFloat(delion.doge.ask), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        //   " \n" +
        //   "L: " + parseFloat(delion.doge.last).toFixed(8) + "\n" +
        //   " ($ " + calcUSD(Number.parseFloat(delion.doge.last), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        //   " \n" +
        //   "B: " + parseFloat(delion.doge.bid).toFixed(8) + "\n" +
        //   " ($ " + calcUSD(Number.parseFloat(delion.doge.bid), Number.parseFloat(usd.dogecoin.usd)) + ")" + "\n" +
        //   " \n" +
        //   "V: " + delion.doge.volume + " " + config.ticker + "\n", true)
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
      message.channel.send({
        embed
      })
        .then(message => {
          message.delete(loopTime)
        })
      setInterval(function () {
        message.channel.send({
          embed
        })
          .then(message => {
            message.delete(loopTime)
          })
      }, loopTime);
    } else {
      console.log("wrong channel.")
    }
  }
})


client.on('ready', () => {
  console.log('> Price bot launching')
  console.log('>_ ')
  // updateData.test();
  updateData.populateData();
  setInterval(updateData.populateData, 400 * 1000);
})

client.on('message', message => {
  if (message.author.id === client.user.id) return
  if (message.channel.recipient) return
  if (!message.content.startsWith(config.prefix)) return
  if (message.channel.id != config.channelid2) return
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
})

client.login(config.discordtoken)