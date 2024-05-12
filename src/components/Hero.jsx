import { setAlert, setGlobalState, useGlobalState } from "../store";
import { payToMint } from "../Minting";

const Hero = () => {
  const [nfts] = useGlobalState("nfts");

  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Minting new NFT to your account",
    });

    await payToMint()
      .then(() => setAlert("Minting Successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  };

  console.log(nfts.length);
  return (
    <div className="flex h-full">
      <div className="flex flex-col justify-center items-center mx-auto py-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            <span className="text-gradient">NFTs</span> Minting
          </h1>

          <p className="text-white font-semibold text-sm mt-3">
            Mint the hottest NFTs around.
          </p>

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
            <span className="text-xs font-bold">{nfts.length}/99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
