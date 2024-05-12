import { useEffect } from "react";
import { useGlobalState } from "./store";
import { isWallectConnected, loadNfts } from "./Minting";
import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";

const App = () => {
  const [nfts] = useGlobalState("nfts");

  useEffect(async () => {
    await isWallectConnected().then(() => console.log("Blockchain Loaded"));
    await loadNfts();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between gap-0">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks artworks={nfts} />
      <Footer />
      <Loading />
      <Alert />
    </div>
  );
};

export default App;
