require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_ENDPOINT_URL,
      accounts: [process.env.SEPOLIA_DEPLOY_KEY]
    },
    goerli: {
      url: process.env.GOERLI_ENDPOINT_URL,
      accounts: [process.env.GOERLI_DEPLOYER_KEY]
    },
    ganache: {
      url: process.env.GANACHE_ENDPOINT_URL,
      accounts: [process.env.GANACHE_DEPLOY_KEY]
    },
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/abis"
  },
  mocha: {
    timeout: 40000
  }
}