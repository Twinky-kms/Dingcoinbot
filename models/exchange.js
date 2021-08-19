class exchange {
    constructor(pair, ask, last, bid, volume) {
        this.pair = pair;
        this.ask = ask;
        this.last = last;
        this.bid = bid;
        this.volume = volume;
    }

    getObject() {
        return this;
    }

}

module.exports = exchange
