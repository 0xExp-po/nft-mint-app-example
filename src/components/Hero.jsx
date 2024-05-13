import React, { useState, useEffect } from "react";

import { setAlert, setGlobalState, useGlobalState } from "../store";
import { payToMint, setMaxSupply, setCost } from "../Minting";

const Hero = () => {
  const [nfts] = useGlobalState("nfts");

  const [ownerAccount] = useGlobalState("ownerAccount");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [maxSupply] = useGlobalState("maxSupply");
  const [cost] = useGlobalState("cost");

  console.log(maxSupply, cost);
  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Minting new NFT to your account",
    });

    await payToMint()
      .then(() => setAlert("Minting Successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  };

  const handleSubmitMaxSupply = async (event) => {
    event.preventDefault();
    const new_maxSupply = document.getElementById("maxSupply").value;

    if (new_maxSupply <= 0) return;
    setGlobalState("loading", {
      show: true,
      msg: "Setting the maxSupply",
    });
    await setMaxSupply(new_maxSupply)
      .then(() => setAlert("Setting maxSupply Successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  };

  const handleSubmitCost = async (event) => {
    event.preventDefault();
    const new_maxSupply = document.getElementById("maxSupply").value;
    const new_cost = document.getElementById("cost").value;

    if (new_cost <= 0) return;
    setGlobalState("loading", {
      show: true,
      msg: "Setting the cost",
    });
    await setCost(new_cost)
      .then(() => setAlert("Setting cost Successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
    // Perform any desired actions with the form data
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col justify-center items-center mx-auto py-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            {ownerAccount === connectedAccount ? (
              <span>Admin</span>
            ) : (
              <>
                <span className="text-gradient">NFTs</span> Minting
              </>
            )}
          </h1>

          <p className="text-white font-semibold text-sm mt-3">
            Mint the hottest NFTs around.
          </p>
          {ownerAccount === connectedAccount && (
            <div className="py-2">
              <form onSubmit={handleSubmitMaxSupply} className="flex flex-col">
                <label className="text-md text-white font-semibold py-1">
                  MaxSupply
                </label>
                <input
                  type="number"
                  id="maxSupply"
                  placeholder={maxSupply}
                  min={1}
                  // defaultValue={maxSupply}
                />

                <button
                  type="submit"
                  className="text-white bg-blue-400 py-2 rounded-full mt-2"
                >
                  Submit
                </button>
              </form>
              <form onSubmit={handleSubmitCost} className="flex flex-col">
                <label className="text-md text-white font-semibold py-1">
                  Cost
                </label>
                <input
                  type="number"
                  id="cost"
                  placeholder={cost}
                  // defaultValue={cost}
                  step={0.001}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-400 py-2 rounded-full mt-2"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <button
            className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
            onClick={onMintNFT}
          >
            Mint Now
          </button>

          <div
            className="shadow-xl shadow-black flex flex-row
            justify-center items-center w-10 h-10 rounded-full
          bg-white cursor-pointer p-3 ml-4 text-black 
            hover:bg-[#bd255f] hover:text-white transition-all
            duration-75 delay-100"
          >
            <span className="text-xs font-bold">
              {nfts.length}/{maxSupply}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
