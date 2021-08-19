const config = require('../config.json')

//we use the same bot discord token for prod and test, this is no longer needed.
exports.discordtoken = config.production ? config.prodtoken : config.testtoken,
exports.pricechannel = config.production ? config.pricechannel : config.testchannel,
exports.debug = !config.production,
exports.prefix = config.prefix,
//coin information
exports.coinName = config.coinName,
exports.ticker = config.ticker,
exports.website = config.website,
//exchanges
exports.exchanges = config.exchanges,
//misc
exports.priceLoopTime = 480 * 1000,
exports.token = config.token,
exports.botVersion = config.botVersion,
exports.botId = config.botId;
