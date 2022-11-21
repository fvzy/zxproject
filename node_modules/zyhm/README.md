# zyhm

This is a library that allows you to remotely control your web hosting server that is running cPanel for personal or bot use.</br>
Recoded and fixing outlog from : [`@ihadeed/node-whm`](https://github.com/ihadeed/node-whm)


### Instalation

```bash
npm i zyhm
```

### Usage JavaScript

```javascript
var ZYHM = require('zyhm');
var ZYHMClient = new ZYHM.Client({
    serverUrl: 'https://myserver.com:2087',
    remoteAccessKey: 'remoteAccessKeyHere',
    username: 'resellerOrRootUser'
});

ZYHMClient.createAccount({
    username: 'myuser',
    password: 'mySecurePassword!',
    plan: 'Pro',
    domain: 'clientdomain.com'
}).then(
    function(success){ 
        console.log(success);
        // do something with data
    },
    function(error) {
        console.error(error);
        // do something with data
    }
);

```
### Usage Typescript
```typescript
import { Client, ZYHMOptions } from 'zyhm';

const ZYHMClientOptions: ZYHMOptions = {
   serverUrl: 'https://myserver.com:2087',
   remoteAccessKey: 'remoteAccessKeyHere',
   username: 'resellerOrRootUser'
};

const client: Client = new Client(ZYHMClientOptions);

client.createAccount({
           username: 'myuser',
           password: 'mySecurePassword!',
           plan: 'Pro',
           domain: 'clientdomain.com'
       }).then(
           success => { 
               console.log(success);
               // do something with data
           },
           error => {
               console.error(error);
               // do something with data
           }
       );
```
## Methods Calling Function

#### `createAccount(options: CreateAccountOptions): Promise<any>`
#### `terminateAccount(user: string): Promise<any>`
#### `listAccounts(): Promise<AccountData[]>`
#### `listIPAddresses(): Promise<any>`


## Interfaces _`TypeScript`_

#### `WHMOoptions`
#### `CreateAccountOptions`
#### `AccountData`

