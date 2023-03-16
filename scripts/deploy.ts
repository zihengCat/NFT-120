import { ethers } from "hardhat";

async function main() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const JGT = await ethers.getContractFactory("JungleGachaToken");
    const jgt = await JGT.deploy("JungleGachaToken", "JGT");
    await jgt.deployed();

    // await jgt.mint(owner.address, ethers.utils.parseUnits("10000", 18));
    console.log(`JungleGachaToken deployed to ${jgt.address}, and mint ${owner.address} 100 tokens.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
