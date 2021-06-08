nodejs-user-agent
=======

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/nodejs-user-agent.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nodejs-user-agent
[download-image]: https://img.shields.io/npm/dm/nodejs-user-agent.svg?style=flat-square
[download-url]: https://npmjs.org/package/nodejs-user-agent

User agent string for Node.js http request.

Based on [default-user-agent](https://github.com/node-modules/default-user-agent)

## Install

```bash
$ npm install nodejs-user-agent
```

## Usage

```js
import { ua } from 'nodejs-user-agent';

// darwin
console.log(ua()); // 'Node.js/14.16.1 (macOS Big Sur; x64)'
console.log(ua('urllib', '0.1.1')); // 'urllib/0.1.1 Node.js/14.16.1 (macOS Big Sur; x64)'

// linux
// 'Node.js/14.16.1 (Linux 3.13; x64)'
```

## License

[MIT](LICENSE.txt)
