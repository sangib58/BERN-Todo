const ABI = require("../ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://proud-white-darkness.ethereum-sepolia.discover.quiknode.pro/1f658959fc00ca243762d3076534751234497ed7/"
    )
  );
  const contractAddress = "0x18820cbc455819fb796e8dd6a16a0d48fe1c50cf";
  const contract = new web3.eth.Contract(ABI, contractAddress);

  module.exports={contract}