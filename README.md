# discord-webhooks

`discord-webhooks` **manages Discord's Webhooks**

## Example

```js
const { Webhook } = require('discord-webhooks');

const webhook = new Webhook({
    id: ID,
    token: TOKEN,
});

webhook.send({
    content: 'Hello, World.',
})
    .catch(console.error);
```

**Note:** `discord-webhooks` is owned by someone, and so i can't really publish this to NPM right now.
