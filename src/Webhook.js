const { request } = require('undici');

const pack = (d) => JSON.stringify(d);

class Webhook {
    /**
     * @typedef {Object} WebhookOptions
     *
     * @property {string} id - the ID of the webhook
     * @property {string} token - the token of the webhook
     *
     */

    /**
     * Represents a webhook
     *
     * @param {WebhookOptions} options - The URL of the Webhook
     */
    constructor(options = {}) {
        this.options = options;

        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    /**
     * @typdef {Object} WebhookMessageOptions
     *
     * @property {string} content
     * @property {Array<object>} embeds
     */

    /**
     * Sends a message through the Webhook.
     *
     * @param {WebhookMessageOptions} options
     * @returns {Promise<Response>}
     */
    async send(options = {}) {
        if (!'content' in options || 'embeds' in options) {
            throw new Error('No `content` or `embeds` value found!');
        }

        const res = await request(`https://discord.com/api/v10/webhooks/${this.options.id}/${this.options.token}`, {
            headers: this.headers,
            body: pack(options),
            method: 'POST'
        });

        return res;
    }
}

module.exports = Webhook;
