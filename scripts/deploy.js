require('dotenv').config()
const hre = require('hardhat')
const etherUtils = require('ethers')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main () {
  const ethers = hre.ethers

  console.log('network:', await ethers.provider.getNetwork())

  const signer = (await ethers.getSigners())[0]
  console.log('signer:', await signer.getAddress())


  const tokenWallet = '0x5363e726f2d8e225f26152545a1E1e591eEa1009'
  const totalSupply = etherUtils.utils.parseUnits((100 * 10**6).toString(), 18).toString()

  /**
   *  Deploy GoodGameGuildToken
   */
  const GoodGameGuildToken = await ethers.getContractFactory('GoodGameGuildToken', {
    signer: (await ethers.getSigners())[0]
  })

  const gggContract = await GoodGameGuildToken.deploy(
    tokenWallet,
    totalSupply
  );
  await gggContract.deployed()

  console.log('GoodGameGuildToken deployed to:', gggContract.address)

  await sleep(60);
  await hre.run("verify:verify", {
    address: gggContract.address,
    contract: "contracts/GoodGameGuildToken.sol:GoodGameGuildToken",
    constructorArguments: [tokenWallet, totalSupply]
  })

  randomGeneratorAddress = gggContract.address

  console.log('GoodGameGuildToken token contract verified')

  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
