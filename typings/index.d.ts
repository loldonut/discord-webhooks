import { Response } from 'undici';

export class Webhook {
    public constructor(options: WebhookOptions | string);
    public options: WebhookOptions;
    public headers: {
        'Content-Type': 'application/json'
    };

    public send(options: WebhookMessageOptions): Promise<Response>;
    private fetchWebhook(url: string): Promise<void>;
}

export interface WebhookOptions {
    id: string;
    token: string;
}

export interface WebhookMessageOptions {
    content: string;
    embeds: Array<object>;
}
