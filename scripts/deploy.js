const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'
  const Contract = await ethers.getContractFactory('Minting')

  const contract = await Contract.deploy(' NFT', 'ADM', base_uri)

  await contract.deployed()

  const ownerAddress = await contract.owner()
  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address: ', contract.address)
    console.log('Owner address: ', ownerAddress)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})