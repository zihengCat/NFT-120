import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("JungleGachaNFT", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const JGT = await ethers.getContractFactory("JungleGachaToken");
    const j = await JGT.deploy("JungleGachaToken", "JGT");

    return { j, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Constructor", async function () {
      const { j, owner } = await loadFixture(deployFixture);
      expect(await j.totalSupply()).to.equal(await j.balanceOf(owner.address));
      expect(await j.balanceOf(owner.address)).to.equal(0);
      expect(await j.name()).to.equal("JungleGachaToken");
      expect(await j.symbol()).to.equal("JGT");
    });

    it("mint & burn", async function () {
      const { j, owner } = await loadFixture(deployFixture);
      let amount = ethers.utils.parseUnits("100", 18);

      j.mint(owner.address, amount);
      expect(await j.balanceOf(owner.address)).to.equal(amount);

      j.mint(owner.address, amount);
      expect(await j.balanceOf(owner.address)).to.equal(amount.add(amount));

      j.burn(owner.address, amount);
      expect(await j.balanceOf(owner.address)).to.equal(amount);

      j.burn(owner.address, amount);
      expect(await j.balanceOf(owner.address)).to.equal(0);

    });

    it("mintBatch", async function () {
      const { j } = await loadFixture(deployFixture);
      const [owner, a, b, c] = await ethers.getSigners();
      let amount = ethers.utils.parseUnits("100", 18);

      j.mintBatch([a.address, b.address, c.address], amount);
      expect(amount).to
        .equal(await j.balanceOf(a.address))
        .equal(await j.balanceOf(b.address))
        .equal(await j.balanceOf(c.address))
    });

  });
});
