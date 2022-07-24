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

You can pass the URL in a string instead of an Object,
However, you might need to execute `Webhook` functions with `await`

**Note:** `discord-webhooks` is owned by someone, and so i can't really publish this to NPM right now.
