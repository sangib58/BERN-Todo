const ABI = require("../ABI.json");
const { Web3 } = require("web3");
const EthereumTx = require("ethereumjs-tx");

const directTask = async (req, res) => {
  try {
    /* const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://proud-white-darkness.ethereum-sepolia.discover.quiknode.pro/1f658959fc00ca243762d3076534751234497ed7/"
      )
    ); */
    const infura =
      "https://sepolia.infura.io/v3/9a1e7dfd25da4c4e9a03862057e22512";
    const web3 = new Web3(new Web3.providers.HttpProvider(infura));
    const contractAddress = "0x18820cbc455819fb796e8dd6a16a0d48fe1c50cf";
    const accountAddress = "0xd81b7ba82B1387694A78b9055ea0D933007702b7";
    const pk =
      "143398f45144c8c7d2cda712ee36594dc4125bf49c7060f8b995d208bb3bd1f0";

    web3.eth.defaultAccount = accountAddress;

    let accounts=await web3.eth.getAccounts();
    console.log('All accounts',accounts)

    const currentBlockNumber=await web3.eth.getBlockNumber()
    console.log('Current block number:',currentBlockNumber)

    /* let walletBalance = await web3.eth.getBalance(web3.eth.defaultAccount).then(
        (result)=>{
            console.log(result)
        }
    ) */
    //console.log(walletBalance);

    web3.eth.getTransactionCount(
      web3.eth.defaultAccount,
      function (err, nonce) {
        console.log("nonce value is ", nonce);
        const contract = new web3.eth.Contract(
          JSON.parse(ABI),
          contractAddress,
          {
            from: web3.eth.defaultAccount,
            gas: 3000000,
          }
        );
        const functionAbi = contract.methods
          .createTask("Test task insert directly", "29-09-2023")
          .encodeABI();
        var details = {
          nonce: nonce,
          gasPrice: web3.utils.toHex(web3.utils.toWei("3", "gwei")),
          gas: 98000,
          to: contractAddress,
          value: 0,
          data: functionAbi,
        };
        const transaction = new EthereumTx(details);

        transaction.sign(Buffer.from(pk, "hex"));
        var rawData = "0x" + transaction.serialize().toString("hex");
        web3.eth
          .sendSignedTransaction(rawData)
          .on("transactionHash", function (hash) {
            console.log(["transferToStaging Trx Hash:" + hash]);
          })
          .on("receipt", function (receipt) {
            console.log(["transferToStaging Receipt:", receipt]);
          })
          .on("error", console.error);
      }
    );
  } catch (error) {
    res.status(500).json({ status: 500, message: "Some errors occurs" });
    console.error(error);
  }
};

module.exports = {
  directTask,
};
