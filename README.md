# discord-webhooks

`discord-webhooks` **manages Discord's Webhooks**

## Example

```js
const { Webhook } = require('discord-webhooks');

// You can also pass a string with URL instead.
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

You can pass the URL in a string instead of an Object for the webhook credentials.

Note that you must use `Websocket#send()` inside the `ready` event
so the function will have your webhook's ID and Token.

[See what you can send using the webhook here...](https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params)
