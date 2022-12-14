const { network } = require("hardhat");
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("----------------------------------------------------");
  const arguments = [];
  const nftMarketplace = await deploy("Nftmarketplace", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  const { YOUR_ETHERSCAN_API_KEY } = process.env;

  // Verify the deployment
  if (!developmentChains.includes(network.name) && YOUR_ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(nftMarketplace.address, arguments);
  }
  log("----------------------------------------------------");
};

module.exports.tags = ["all", "nftmarketplace"];
