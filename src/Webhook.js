const { EventEmitter } = require('node:events');
const { request } = require('undici');
const DiscordAPIError = require('./DiscordAPIError');

const WebhookMessagePayload = require('./WebhookMessagePayload');

const pack = (d) => JSON.stringify(d);

class Webhook extends EventEmitter {
    /**
     * @typedef {Object} WebhookOptions
     *
     * @property {string} id - the ID of the webhook
     * @property {string} token - the token of the webhook
     */

    /**
     * Represents a webhook
     *
     * @param {WebhookOptions|string} options - The URL of the Webhook
     */
    constructor(options) {
        super();

        /**
         * Options to be used for requests.
         * @type {WebhookOptions}
         * @private
         */
        this.options = {};
        this.isReady = false;

        this.fetchWebhook(options);

        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    /**
     * @typedef {Object} AttachmentOptions
     * 
     * @property {string} id
     * @property {string} filename
     * @property {?string} description
     * @property {?string} content_type
     * @property {?number} size
     * @property {?string} url
     * @property {?string} proxy_url
     * @property {?number} height
     * @property {?number} width
     * @property {?boolean} ephemeral
     */

    /**
     * @typdef {Object} WebhookMessageOptions
     *
     * @property {?string} content
     * @property {?string} username
     * @property {?string} avatarURL
     * @property {?boolean} tts
     * @property {?Array<Object>} embeds
     * @property {?AllowedMentionsOptions} allowedMentions
     * @property {?Array<Object>} components
     * @property {?string} payloadJSON
     * @property {?Array<AttachmentOptions>} attachments
     * @property {?number} flags
     * @property {?string} threadName
     */

    /**
     * Sends a message through the Webhook.
     *
     * @param {WebhookMessageOptions} options
     * @returns {Promise<ResponseData>}
     */
    async send(options = {}) {
        if (options instanceof WebhookMessagePayload) {
            options = options.resolveOptions();
        }
        else {
            options = new WebhookMessagePayload(options)
                .resolveOptions();
        }

        const res = await request(`https://discord.com/api/v10/webhooks/${this.options.id}/${this.options.token}`, {
            headers: this.headers,
            body: pack(options),
            method: 'POST'
        });

        if (res.statusCode > 299) {
            const error = await res.body.json();
            throw new DiscordAPIError(error);
        }

        return res;
    }

    /**
     * Fetches the Webhook URL
     *
     * @param {string} url
     * @private
     */
    async fetchWebhook(url) {
        url = typeof url === 'object'
            ? `https://discord.com/api/v10/webhooks/${this.options.id}/${this.options.token}`
            : url;

        const res = await request(url, {
            headers: this.headers,
            method: 'GET'
        });
        const data = await res.body.json();

        this.options.id ??= data.id;
        this.options.token ??= data.token;

        /**
         * Name of the Webhook
         * @type {string}
         */
        this.name = data.name;
        
        /**
         * ID of the Webhook
         * @type {string}
         */
        this.id = data.id

        /**
         * The default user hash of the webhook
         * @type {string}
         */
        this.avatar = data.avatar;

        /**
         * The type of the webhook
         * @type {number}
         */
        this.type = data.type;

        /**
         * the ID of the Guild the webhook is on
         * @type {string}
         */
        this.guildId = data.guild_id ?? null;

        /**
         * the ID of the Guild the webhook is on
         * @type {string}
         */
        this.channelId = data.channel_id ?? null;

        this.emit('ready', this);
        this.isReady = true;
    }
}

module.exports = Webhook;
