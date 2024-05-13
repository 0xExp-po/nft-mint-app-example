import abi from "./abis/src/contracts/Minting.sol/Minting.json";
import address from "./abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "./store";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`;

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const getEtheriumContract = () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

const payToMint = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const cost = getGlobalState("cost");
    const contract = getEtheriumContract();
    const amount = ethers.utils.parseEther(cost);

    const transaction = await contract.payToMint({
      from: connectedAccount,
      value: amount._hex,
    });

    const receipt = await transaction.wait();

    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

const setMaxSupply = async (new_maxSupply) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = getEtheriumContract();

    const tx = await contract.setMaxsupply(new_maxSupply, {
      from: connectedAccount,
    });

    const receipt = await tx.wait();

    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

const setCost = async (new_cost) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = getEtheriumContract();

    const tx = await contract.setCost(toWei(new_cost), {
      from: connectedAccount,
    });

    const receipt = await tx.wait();

    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

const loadNfts = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = getEtheriumContract();
    const nfts = await contract.getAllNFTs();
    const ownerAccount = await contract.owner();
    const cost = await contract.cost();
    const maxSupply = await contract.maxSupply();

    setGlobalState("nfts", structuredNfts(nfts));
    setGlobalState("ownerAccount", ownerAccount.toLowerCase());
    setGlobalState("maxSupply", maxSupply.toNumber());
    setGlobalState("cost", fromWei(cost));
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

const structuredNfts = (nfts) =>
  nfts
    .map((nft) => ({
      id: Number(nft.id),
      url: opensea_uri + nft.id,
      buyer: nft.buyer,
      imageURL: nft.imageURL,
      cost: parseInt(nft.cost._hex) / 10 ** 18,
      timestamp: new Date(nft.timestamp.toNumber()).getTime(),
    }))
    .reverse();

export {
  isWallectConnected,
  connectWallet,
  payToMint,
  loadNfts,
  getEtheriumContract,
  setMaxSupply,
  setCost,
};
