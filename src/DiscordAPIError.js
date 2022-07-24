class DiscordAPIError extends Error {
    constructor(error) {
        super(`${error.message}`);

        this.code = error.code;
        this.errors = error.errors;
        this.name = `DiscordAPIError[${this.code}]`;
    }
}

module.exports = DiscordAPIError;