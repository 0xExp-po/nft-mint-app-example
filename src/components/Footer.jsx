import ethlogo from "../assets/ethlogo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex flex-col justify-between items-center my-4">
      <div className="flex flex-row justify-center items-center mt-2">
        <img src={ethlogo} alt="logo" className="w-8" />
        <span className="text-white text-xs">NFT Minting © 2024/5/12</span>
      </div>
    </div>
  </div>
);

export default Footer;
