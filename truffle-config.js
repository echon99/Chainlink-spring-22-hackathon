/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require('@truffle/hdwallet-provider');

 // const infuraKey = "fj4jll3k.....";
 //
 const fs = require('fs');
// const mnemonic = process.env.Mnemonic;
const mnemonic =  fs.readFileSync(".secret").toString().trim();

 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send tr
    * ansactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

   networks: {
       // Useful for testing. The `development` name is special - truffle uses it by default
       // if it's defined here and no other network is specified at the command line.
       // You should run a client (like ganache-cli, geth or parity) in a separate terminal
       // tab if you use this network and you must also set the `host`, `port` and `network_id`
       // options below to some value.
       //
       development: {
           host: "127.0.0.1",     // Localhost (default: none)
           port: 7545,            // Standard Ethereum port (default: none)
           network_id: "*",       // Any network (default: none)
       },
       ropsten: {
           provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/009dd4a991014b1a8f29b62fa2c99e89`),

           network_id: 3,       // Ropsten's id
           networkCheckTimeout: 1000000000,
           gas: 5500000,        // Ropsten has a lower block limit than mainnet
           gasPrice: 4000000000, // 4 gwei
           confirmations: 1,    // # of confs to wait between deployments. (default: 0)
           timeoutBlocks: 50000,  // # of blocks before a deployment times out  (minimum/default: 50)
           skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
       },
       kovan: {
           provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/009dd4a991014b1a8f29b62fa2c99e89`),
           network_id: 42,       // Ropsten's id
           networkCheckTimeout: 1000000000,
           gas: 5500000,        // Ropsten has a lower block limit than mainnet
           gasPrice: 4000000000, // 4 gwei
           confirmations: 1,    // # of confs to wait between deployments. (default: 0)
           timeoutBlocks: 50000,  // # of blocks before a deployment times out  (minimum/default: 50)
           skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
       },
       // Useful for private networks
       acala: {
           provider: () => new HDWalletProvider(mnemonic, `https://tc7-eth.aca-dev.network`),
           network_id: 595,   // This network is yours, in the cloud.
           gasPrice: 0x2f03a803ea, // storage_limit = 64001, validUntil = 360001, gasLimit = 10000000
           gas: 0x329b140,
           confirmations: 0
       },
       BNBTEST: {
           provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
           network_id: 97,   // This network is yours, in the cloud.
           networkCheckTimeout: 1000000000,
           gas: 5500000,        // Ropsten has a lower block limit than mainnet
           gasPrice: 4000000000, // 4 gwei
           confirmations: 1,    // # of confs to wait between deployments. (default: 0)
           timeoutBlocks: 50000,  // # of blocks before a deployment times out  (minimum/default: 50)
           skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
       },
       mumbai: {
           provider: () => new HDWalletProvider(mnemonic, `https://matic-mumbai.chainstacklabs.com`),
           network_id: 80001,   // This network is yours, in the cloud.
           networkCheckTimeout: 1000000000,
           gas: 5500000,        // Ropsten has a lower block limit than mainnet
           gasPrice: 4000000000, // 4 gwei
           confirmations: 1,    // # of confs to wait between deployments. (default: 0)
           timeoutBlocks: 50000,  // # of blocks before a deployment times out  (minimum/default: 50)
           skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
       }
   },

   // Set default mocha options here, use special reporters etc.
   mocha: {
     // timeout: 100000
   },

   // Configure your compilers
   compilers: {
     solc: {
       version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       // settings: {          // See the solidity docs for advice about optimization and evmVersion
       settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
           enabled: true,
           runs: 200
         }
       }
       //  evmVersion: "byzantium"
       // }
     }
   },
   // api_keys: {
   //   etherscan: etherscanApiKey
   // },
   // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
   //
   // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
   // those previously migrated contracts available in the .db directory, you will need to run the following:
   // $ truffle migrate --reset --compile-all

   db: {
     enabled: false
   }
 };

