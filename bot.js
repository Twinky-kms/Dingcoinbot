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


client.on('error', console.error);


client.on('message', message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command == 'price') {
    if (message.channel.id === config.pricechannel) {
      client.user.setActivity("Watching prices... 👀")
      //this can be improved... alot.
      raw = data.rawPrices;
      cratex = raw.cratex;
      delion = raw.delion;
      dextrade = raw.dextrade;
      southxchange = raw.southxchange;
      autradex = raw.autradex;
      var embed = new Discord.RichEmbed()
        .setAuthor(config.coinName + " Markets")
        .setColor('#00AE96')
        .setDescription(":chart_with_upwards_trend: Current " + config.ticker + " prices.")
        .setTimestamp()
        .addField("Cratex (DINGO/BTC): ", "Ask: " + parseFloat(cratex.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.btc.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Cratex (DINGO/LTC): ", "Ask: " + parseFloat(cratex.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.ltc.volume +" "+ config.ticker + "\n", true)
          .addField("Cratex (DINGO/DOGE): ", "Ask: " + parseFloat(cratex.doge.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.doge.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.doge.volume +" "+ config.ticker + "\n", true)
          .addField("Delion (DINGO/BTC): ", "Ask: " + parseFloat(delion.btc.ask).toFixed(9) + "\n" +
          "Last: " + parseFloat(delion.btc.last).toFixed(9) + "\n" +
          "Bid: " + parseFloat(delion.btc.bid).toFixed(9) + "\n" +
          "Volume: " + parseFloat(delion.btc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Delion (DINGO/DOGE): ", "Ask: " + delion.doge.ask + "\n" +
          "Last: " + parseFloat(delion.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(delion.doge.bid).toFixed(8) + "\n" +
          "Volume: " + delion.doge.volume +" "+ config.ticker + "\n", true)
          .addField("Dex-Trade (DINGO/BTC): ", "Ask: " + Number.parseFloat(dextrade.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(dextrade.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(dextrade.btc.bid).toFixed(8) + "\n" +
          "Volume: " + dextrade.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Dex-Trade (DINGO/USDT): ", "Ask: " + dextrade.usdt.ask + "\n" +
          "Last: " + parseFloat(dextrade.usdt.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(dextrade.usdt.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(dextrade.usdt.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Southxchange (DINGO/BTC): ", "Ask: " + Number.parseFloat(southxchange.btc.ask).toFixed(9) + "\n" +
          "Last: " + parseFloat(southxchange.btc.last).toFixed(9) + "\n" +
          "Bid: " + parseFloat(southxchange.btc.bid).toFixed(9) + "\n" +
          "Volume: " + southxchange.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Southxchange (DINGO/LTC): ", "Ask: " + Number.parseFloat(southxchange.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(southxchange.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(southxchange.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(southxchange.ltc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/BTC): ", "Ask: " + Number.parseFloat(autradex.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.btc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.btc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/LTC): ", "Ask: " + Number.parseFloat(autradex.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.ltc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/DOGE): ", "Ask: " + Number.parseFloat(autradex.doge.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.doge.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.doge.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/AUS): ", "Ask: " + Number.parseFloat(autradex.aus.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.aus.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.aus.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.aus.volume).toFixed(0) +" "+ config.ticker + "\n", true)
      message.channel.send({
        embed
      })
        .then(message => {
          // client.user.setActivity('Last Price: ' + parseFloat(constants.marketsum.altmv2last).toFixed(8))
          message.delete(config.priceLoopTime)
        })
      var interval = setInterval(function () {
        var embed = new Discord.RichEmbed()
        .setAuthor(config.coinName + " Markets")
        .setColor('#00AE96')
        .setDescription(":chart_with_upwards_trend: Current " + config.ticker + " prices.")
        .setTimestamp()
        .addField("Cratex (DINGO/BTC): ", "Ask: " + parseFloat(cratex.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.btc.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Cratex (DINGO/LTC): ", "Ask: " + parseFloat(cratex.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.ltc.volume +" "+ config.ticker + "\n", true)
          .addField("Cratex (DINGO/DOGE): ", "Ask: " + parseFloat(cratex.doge.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(cratex.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(cratex.doge.bid).toFixed(8) + "\n" +
          "Volume: " + cratex.doge.volume +" "+ config.ticker + "\n", true)
          .addField("Delion (DINGO/BTC): ", "Ask: " + parseFloat(delion.btc.ask).toFixed(9) + "\n" +
          "Last: " + parseFloat(delion.btc.last).toFixed(9) + "\n" +
          "Bid: " + parseFloat(delion.btc.bid).toFixed(9) + "\n" +
          "Volume: " + parseFloat(delion.btc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Delion (DINGO/DOGE): ", "Ask: " + delion.doge.ask + "\n" +
          "Last: " + parseFloat(delion.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(delion.doge.bid).toFixed(8) + "\n" +
          "Volume: " + delion.doge.volume +" "+ config.ticker + "\n", true)
          .addField("Dex-Trade (DINGO/BTC): ", "Ask: " + Number.parseFloat(dextrade.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(dextrade.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(dextrade.btc.bid).toFixed(8) + "\n" +
          "Volume: " + dextrade.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Dex-Trade (DINGO/USDT): ", "Ask: " + dextrade.usdt.ask + "\n" +
          "Last: " + parseFloat(dextrade.usdt.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(dextrade.usdt.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(dextrade.usdt.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Southxchange (DINGO/BTC): ", "Ask: " + Number.parseFloat(southxchange.btc.ask).toFixed(9) + "\n" +
          "Last: " + parseFloat(southxchange.btc.last).toFixed(9) + "\n" +
          "Bid: " + parseFloat(southxchange.btc.bid).toFixed(9) + "\n" +
          "Volume: " + southxchange.btc.volume +" "+ config.ticker + "\n", true)
          .addField("Southxchange (DINGO/LTC): ", "Ask: " + Number.parseFloat(southxchange.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(southxchange.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(southxchange.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(southxchange.ltc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/BTC): ", "Ask: " + Number.parseFloat(autradex.btc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.btc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.btc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.btc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/LTC): ", "Ask: " + Number.parseFloat(autradex.ltc.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.ltc.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.ltc.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.ltc.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/DOGE): ", "Ask: " + Number.parseFloat(autradex.doge.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.doge.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.doge.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.doge.volume).toFixed(0) +" "+ config.ticker + "\n", true)
          .addField("Autradex (DINGO/AUS): ", "Ask: " + Number.parseFloat(autradex.aus.ask).toFixed(8) + "\n" +
          "Last: " + parseFloat(autradex.aus.last).toFixed(8) + "\n" +
          "Bid: " + parseFloat(autradex.aus.bid).toFixed(8) + "\n" +
          "Volume: " + parseFloat(autradex.aus.volume).toFixed(0) +" "+ config.ticker + "\n", true)
        message.channel.send({
          embed
        })
          .then(message => {
            message.delete(config.priceLoopTime)
          })
        // client.user.setActivity('Last Price: ' + parseFloat(constants.marketsum.altmv2last).toFixed(8))
      }, config.priceLoopTime); //1900 * 1000);
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