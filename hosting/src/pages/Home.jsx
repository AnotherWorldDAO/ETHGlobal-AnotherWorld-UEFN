import React, { Component } from "react"
import { ethers } from "ethers";
import awlogo from '../images/awlogowhite.png';
import Illustration from '../images/hero-illustration.svg';
import maycImage from '../images/mayc2332bk.png';
import karmaImage from '../images/karma19096.png';

const erc20BalanceOfABI = [
  {
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address",
    }],
    "name": "balanceOf",
    "outputs":
      [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function",
  }];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      ethAddress: null,
      canDownload: false,
    };
  }

  componentDidMount() {
  }

  async connectToWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress();
      const ContractAPEAddress = import.meta.env.VITE_APECOIN_CONTRACT;
      const ContractAPE = new ethers.Contract(
          ContractAPEAddress,
          erc20BalanceOfABI,
          provider,
      );
      const balanceBN = await ContractAPE.balanceOf(address);
      const balance = Number(ethers.utils.formatEther(balanceBN));

      if (address && balance >= 1){
        this.setState({
          ethAddress: address,
          balance: balance,
          canDownload: balance >= 1,
        });
        return address;
      } else {
        alert(`Not enough $APE at ${address}`);
        window.location="/";
        return false;
      }
    } catch (err) {
      this.setState({
        user: null,
        ethAddress: null,
        signing: false,
        verifying: false,
        ENS: null
      });
      alert("You need to log into your ETH wallet.");
      window.location="/";
    }
    return false;
  };

  render() {
    const {ethAddress, canDownload} = this.state;
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative">
      {/* Illustration */}
      <div className="md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
        <img src={Illustration} className="max-w-none" width="1440" height="1265" alt="Hero Illustration" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-20">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 font-bangers mb-6 " data-aos="fade-up">
              Apecoin UEFN Template
            </h2>
            
            <p className="text-sm text-plate-300 mb-5 text-center" data-aos="fade-up" data-aos-delay="500">Use this Apecoin + UEFN <a href="https://www.unrealengine.com/en-US/blog/unreal-editor-for-fortnite-is-now-available-in-beta">(<b>Unreal Editor for Fortnite</b>)</a> template to jump start your Apecoin game (in Fortnite!!)</p>
            <ul className="text-sm text-plate-300 mb-5 text-center">
            <b>Quick Start</b>
            <ol>1. Have an Epic Games Account.</ol>
            <ol>2. Install UEFN from Epic Games Launcher (40Gb).</ol>
            <ol>3. Download Apecoin UEFN template ({`$APE >=1 required`}).</ol>
            </ul>
            

            <div
              className="mb-0 max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              

              <img className="mx-auto rounded" src="https://ipfs.io/ipfs/QmTXipPvwLgkkfZP1DbB2pQGKb4AEmhUP6fYcG3z1q4Ez8" alt="Hero" width={'400px'}/>

              <button onClick={
                ()=>{
                  if (!ethAddress){
                    this.connectToWallet();
                  } else {
                    if (canDownload){
                      window.open(import.meta.env.VITE_UEFN_DOWNLOAD_URL);
                    }
                  }
                }} className="btn text-sm text-slate-200 border hover:border-slate-100 border-slate-600 shadow-sm mt-3 w-40">
                {canDownload ? `Download`: `Check Eligibility`}<br/>{canDownload ? `Apecoin + UEFN Template ${import.meta.env.VITE_UEFN_DOWNLOAD_VERSION}`: `($APE >= 1)`}
              </button>
              
            </div>
          </div>
          
          
          <div className="pt-8 mt-2" data-aos="fade-up" data-aos-delay="900"><p className="text-sm text-plate-300 mb-5 text-center" data-aos="fade-up" data-aos-delay="500">Built by Another World Team</p>
          
          <div className="flex items-center justify-center">
          

            
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-transparent p-30 rounded text-center"><img className="mx-auto" src={maycImage} alt="Hero" width={'160px'}/><br/><a href="https://twitter.com/JackieLeeETH">jackie.eth</a></div>
        <div className="bg-transparent p-30 rounded text-center"><img className="mx-auto" src={karmaImage} alt="Hero" width={'160px'}/><br/><a href="https://twitter.com/skullapes">skvll.eth</a></div>
      </div>
      
    </div>
            
            
            
          </div>
        </div>
      </div>
    </section>
      <div className="pt-8 mt-2 text-center" data-aos="fade-up" data-aos-delay="1200">
      <a href="https://anotherworld.gg"><img className="mx-auto" src={awlogo} width={'90px'}/></a><p className="text-slate-300 text-sm"><a href="https://ethglobal.com/events/scaling2023">ETH Global Hackathon</a><br/>2023<br/><br/></p></div>
    </div>
  );
}
}

export default Home;