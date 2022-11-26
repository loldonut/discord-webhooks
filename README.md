# discord-webhooks

`discord-webhooks` **manages Discord's Webhooks**

This package is similar to `discord.js`'s `WebhookClient`, but this package is solely focused on Discord's Webhooks.

## Installation

```sh-session
npm install @loldonut/discord-webhooks
```

## Example

```js
const { Webhook } = require('discord-webhooks');

// You can also pass a string with the Webhook's URL instead.
const webhook = new Webhook({
    id: ID,
    token: TOKEN,
});

webhook.once('ready', async (w) => {
    await w.send({
        content: 'Hello, World.'
    });
});
```

You can pass the URL in a string instead of an Object for the webhook's credentials.

Note that you must use `Websocket#send()` inside the `ready` event
so the function will have your webhook's ID and Token.

[See what you can send using webhooks here...](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params)
