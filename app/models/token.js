class Token {
    constructor(opts) {
        if (!opts) opts = {};
        this.value = opts.value;
        this.expires = opts.expires;
    }
}

Token.generate = () => {
    let maxTokenValue = Number.MAX_SAFE_INTEGER;
    let expiresDate = new Date();
    expiresDate.setSeconds(expiresDate.getSeconds() + 120);

    return new Token({
        value: Math.floor(Math.random() * maxTokenValue),
        expires: expiresDate
    });
}

module.exports = Token;