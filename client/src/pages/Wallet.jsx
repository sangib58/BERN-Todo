import Web3 from "web3";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ABI from "./ABI.json";

const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x18820cbc455819fb796e8dd6a16a0d48fe1c50cf";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log(accounts)
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo('/view-all-tasks')
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="wallet_header ">
        <span>WELCOME TO</span> <p>TODO 3.0</p>
      </div>
      <div className="connect_wallet_section todo_btn">
        <p> Please connect metamask wallet to access the app </p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </>
  );
};

Wallet.prototype = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;
