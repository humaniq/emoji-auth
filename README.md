# emoji-auth

The aim of this npm package is quick integration of graphic-pin authorization in your js app. The package uses a list o emoji, exculding all similar and insulting ones

**Installation**

```
npm install emoji-auth
```

In browser include it as regular lib, via the script tag. Once you do this, 'EmojiAuth' object will be available 
```
<script src="./dist/emoji-auth.js"></script>
```

In node.js use require
```
var EmojiAuth = require('emoji-auth');
```

**Initialization**

```js
var limit = 9
var set = new EmojiAuth(limit);
```

> **Notice** Check ./example.js for implementation example