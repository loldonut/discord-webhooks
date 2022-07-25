import { EventEmitter } from 'node:events';
import { ResponseData } from 'undici/types/dispatcher';

export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;

export class Webhook<Ready extends boolean = boolean> extends EventEmitter {
    public constructor(options: WebhookOptions | string);
    public options: WebhookOptions;
    public headers: {
        'Content-Type': 'application/json'
    };

    public name: If<Ready, string>;
    public id: If<Ready, string>;
    public avatar: If<Ready, string>;
    public type: If<Ready, number>;
    public guildId: If<Ready, string | null>;
    public channelId: If<Ready, string | null>;

    public on<K extends keyof WebhookEvents>(event: K, listener: (...args: WebhookEvents[K]) => void | Promise<void>): this;
    public on<S extends keyof string | symbol>(
        event: Exclude<S, keyof WebhookEvents>,
        listener: (...args: any[]) => void | Promise<void>,
    ): this;

    public once<K extends keyof WebhookEvents>(event: K, listener: (...args: WebhookEvents[K]) => void | Promise<void>): this;
    public once<S extends keyof string | symbol>(
        event: Exclude<S, keyof WebhookEvents>,
        listener: (...args: any[]) => void | Promise<void>,
    ): this;

    public once<K extends keyof WebhookEvents>(event: K, listener: (...args: WebhookEvents[K]) => void | Promise<void>): this;
    public once<S extends keyof string | symbol>(
        event: Exclude<S, keyof WebhookEvents>,
        listener: (...args: any[]) => void | Promise<void>,
    ): this;

    public emit<K extends keyof WebhookEvents>(event: K, ...args: WebhookEvents[K]): boolean;
    public emit<S extends string | symbol>(
        event: Exclude<S, keyof WebhookEvents>,
        ...args: unknown[]
    ): boolean;

    public off<K extends keyof WebhookEvents>(event: K, listener: (...args: WebhookEvents[K]) => void | Promise<void>): this;
    public off<S extends keyof string | symbol>(
        event: Exclude<S, keyof WebhookEvents>,
        listener: (...args: any[]) => void | Promise<void>,
    ): this;

    public send(options: WebhookMessageOptions): Promise<ResponseData>;
    private fetchWebhook(url: string): Promise<void>;
}

export class WebhookMessagePayload {
    public constructor(options: WebhookMessageOptions);
    public options: WebhookMessageOptions;

    public resolveOptions(): Object;
    public resolveAllowedMentions(allowedMentions: AllowedMentionsOptions): Object;
}

export interface AllowedMentionOptions {
    parse?: Array<'users' | 'roles' | 'everyone'>;
    roles?: Array<string>;
    users?: Array<string>;
    repliedUser?: boolean;
}

export interface AttachmentOptions {
    id: string;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    ephemeral?: boolean;
}

export interface WebhookEvents {
    ready: [webhook: Webhook<true>];
}

export interface WebhookOptions {
    id: string;
    token: string;
}

export interface WebhookMessageOptions {
    content?: string;
    username?: string;
    avatarURL?: string;
    tts?: boolean;
    embeds?: Array<Object>;
    allowedMentions?: AllowedMentionOptions;
    components?: Array<Object>;
    attachments?: Array<AttachmentOptions>;
    flags?: number;
    threadName?: string;
    threadId?: string;
}
