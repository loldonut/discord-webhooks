class WebhookMessagePayload {
    /**
     * A Message Payload for the API
     * 
     * @param {WebhookMessageOptions} options 
     */
    constructor(options) {
        this.options = options;
    }

    resolveOptions() {
        const content = this.options.content;
        const allowedMentions = this.resolveAllowedMentions(this.options.allowedMentions);
        
        const avatarURL = this.options.avatarURL ?? null;
        const payloadJSON = this.options.payloadJSON ?? null;
        const threadName = this.options.threadName ?? null;
        const tts = this.options.tts ?? false;
        const attachments = Array.isArray(this.options.attachments)
            ? attachments
            : [];

        return {
            content,
            username: this.options.username,
            avatar_url: avatarURL,
            tts,
            embeds: this.options.embeds,
            allowed_mentions: allowedMentions,
            components: this.options.components,
            payload_json: payloadJSON,
            attachments: attachments,
            flags: this.options.flags,
            thread_name: threadName,
        };
    }

    /**
     * @typedef {'user'|'roles'|'everyone'} AllowedMentionsTypes
     */

    /**
     * @typedef {Object} AllowedMentionsOptions
     * @property {?Array<AllowedMentionsTypes>} parse
     * @property {?Array<string>} roles
     * @property {?Array<string>} users
     * @property {?boolean} repliedUser
     */

    /**
     * @param {AllowedMentionsOptions} allowedMentions 
     * @returns 
     */
    resolveAllowedMentions(allowedMentions) {
        const parse = Array.isArray(allowedMentions?.parse)
            ? allowedMentions.parse
            : null;
        const replied_user = allowedMentions?.repliedUser ?? false;

        return {
            parse,
            roles: allowedMentions?.roles,
            users: allowedMentions?.users,
            replied_user,
        };
    }
}

module.exports = WebhookMessagePayload;