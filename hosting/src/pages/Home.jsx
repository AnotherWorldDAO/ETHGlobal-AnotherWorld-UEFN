import React, { Component } from "react"
import { ethers } from "ethers";
import { Link } from 'react-router-dom';
import awlogo from '../images/awlogowhite.png';
import Illustration from '../images/hero-illustration.svg';
import maycImage from '../images/mayc2332bk.png';
import karmaImage from '../images/karma19096.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      ethAddress: null
    };
  }

  componentDidMount() {
  }

  getSigner = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      this.signer = this.provider.getSigner();
      const address = await this.signer.getAddress();
      this.setState({
        ethAddress: address.toLowerCase(),
        signing: true,
        ENS: null
      });
      return address.toLowerCase();
    } catch (err) {
      this.setState({
        user: null,
        ethAddress: null,
        signing: false,
        verifying: false,
        ENS: null
      });
      alert("You need to log into your ETH wallet.");

      //throw new Error(
      //  'You need to log into your MetaMask wallet.'
      //);
    }
    return false;
  };

  render() {
    const {user, ethAddress} = this.state;
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
            <h2 className="h2 font-bangers mb-6" data-aos="fade-up">
              Apecoin UEFN Template
            </h2>
            
            <p className="text-sm text-plate-300 mb-5 text-center" data-aos="fade-up" data-aos-delay="500">Use this Apecoin + UEFN <a href="https://www.unrealengine.com/en-US/blog/unreal-editor-for-fortnite-is-now-available-in-beta">("Unreal Editor for Fortnite")</a> template to jump start your Apecoin game.</p>

            <div
              className="mb-0 max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              

              <img className="mx-auto rounded" src="https://ipfs.io/ipfs/QmTXipPvwLgkkfZP1DbB2pQGKb4AEmhUP6fYcG3z1q4Ez8" alt="Hero" width={'400px'}/>

              <button className="btn text-sm text-slate-200 border hover:border-slate-100 border-slate-600 shadow-sm mt-3 w-full" to="/ps">
                {`Download`}<br/>{`Apecoin + UEFN Template`}<br/><br/>{`(Eligibility: $APE >= 1)`}
              </button>
              
            </div>
          </div>
          
          
          <div className="pt-8 mt-2" data-aos="fade-up" data-aos-delay="900">
          
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
      <a href="https://anotherworld.gg"><img className="mx-auto" src={awlogo} width={'90px'}/></a><p className="text-slate-300 text-sm">built during <a href="https://ethglobal.com/events/scaling2023">ETH Global Hackathon</a><br/>2023<br/><br/></p></div>
    </div>
  );
}
}

export default Home;