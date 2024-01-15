import {ethers} from 'ethers';
import {Alert} from 'react-native';
import WalletConnectProvider from '@walletconnect/web3-provider';
import deviceStorage from '../../../utils/AuthDeviceStorage';
// const testnet = 'https://alfajores-forno.celo-testnet.org/';
const testnet = 'https://forno.celo.org';
let NIGERIA_SERVICE_SC_ADDRESS = '';
let NFTICKET_MASTER_SC_ADDRESS = '';
let MTP_WALLET_ADDRESS = '';
let ENGN_SC_ADDRESS = '';
let PROCESSOR_CONTRACT_ADDRESS = '';

export async function getNFTBalance(accountId) {
  try {
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    const abis = JSON.parse(await deviceStorage.getNFTAbi());
    // let abi = NFTicket.abi;
    let abi = [];
    abis.map(item => {
      if (item.key === 'NFTICKET_MASTER_ABI') {
        abi = JSON.parse(item.value);
      }
    });
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    address.map(item => {
      if (item.key === 'NFTICKET_MASTER_SC_ADDRESS') {
        NFTICKET_MASTER_SC_ADDRESS = item.value;
      }
      if (item.key === 'ENGN_SC_ADDRESS') {
        ENGN_SC_ADDRESS = item.value;
      }
    });
    let contract = new web3.eth.Contract(abi, NFTICKET_MASTER_SC_ADDRESS);
    var allowance = await contract.methods
      .getServiceProviderPoolSize(accountId, ENGN_SC_ADDRESS)
      .call();
    return {
      success: true,
      data: allowance,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error,
    };
  }
}

export async function getSignature(accountId, connector, message) {
  try {
    const provider = connector;
    await provider.enable();
    const web3 = new Web3(provider);
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    address.map(item => {
      if (item.key === 'PROCESSOR_CONTRACT_ADDRESS') {
        PROCESSOR_CONTRACT_ADDRESS = item.value;
      }
    });
    // EIP191
    // const types = ['string', 'string', 'string', 'uint256'];

    // const values = {
    //   latitude: message.latitude.toString(),
    //   longitude: message.longitude.toString(),
    //   locationName: message.locationName,
    //   timestamp: message.timestamp,
    // };

    // const digest = ethers.utils.solidityKeccak256(types, Object.values(values));
    // const ethers_provider = new ethers.providers.Web3Provider(provider);
    // const signer = ethers_provider.getSigner();
    // // Not secure message
    // const signature = await signer.signMessage(ethers.utils.arrayify(digest));

    // EIP712
    const types = {
      JourneyPayload: [
        {name: 'latitude', type: 'string'},
        {name: 'longitude', type: 'string'},
        {name: 'locationName', type: 'string'},
        {name: 'timestamp', type: 'uint256'},
      ],
    };

    const domain = {
      name: 'NFTicket',
      version: '1',
      verifyingContract: PROCESSOR_CONTRACT_ADDRESS,
      chainId: connector.chainId,
    };
    const latitude = message.latitude.toString();
    const longitude = message.longitude.toString();
    const locationName = message.locationName;
    const timestamp = message.timestamp;
    const values = {
      latitude,
      longitude,
      locationName,
      timestamp,
    };
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const signature = await signer._signTypedData(domain, types, values);
    return {
      success: true,
      signature: signature,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}
export async function getValoraBalance(accountId) {
  const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
  var balance = await web3.eth.getBalance(accountId);
  balance = await web3.utils.fromWei(balance, 'ether');
  balance = parseFloat(balance).toFixed(5);
  return balance;
}
// Approve ERC20Token
export async function approveERC(
  amount,
  accountId,
  contractAddress,
  spender,
  connector,
) {
  try {
    const abis = JSON.parse(await deviceStorage.getNFTAbi());
    // let abi = NGNService.abi;
    let abi = [];
    abis.map(item => {
      if (item.key === 'NGN_TOKEN_ABI') {
        abi = JSON.parse(item.value);
      }
    });
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    address.map(item => {
      if (item.key === 'NFTICKET_MASTER_SC_ADDRESS') {
        NFTICKET_MASTER_SC_ADDRESS = item.value;
      }
    });
    const provider = new WalletConnectProvider({
      rpc: {
        44787: 'https://alfajores-forno.celo-testnet.org',
        42220: 'https://forno.celo.org',
      },
      // chainId: 44787,
      connector: connector,
      qrcode: false,
    });
    await provider.enable();
    const web3 = new Web3(provider);
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    let contract = new web3.eth.Contract(abi, contractAddress, signer);
    contract.defaultAccount = accountId;
    const Approve = await contract.methods
      .approve(spender, web3.utils.toBN(amount).pow(web3.utils.toBN(18)))
      .send({
        from: accountId,
      });
    console.log(Approve);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error,
    };
  }
}

// Refund
export async function doRefund(accountId, amount, connector) {
  try {
    const abis = JSON.parse(await deviceStorage.getNFTAbi());
    // let abi = NGNService.abi;
    let abi = [];
    abis.map(item => {
      if (item.key === 'NFTICKET_MASTER_ABI') {
        abi = JSON.parse(item.value);
      }
    });
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    address.map(item => {
      if (item.key === 'NFTICKET_MASTER_SC_ADDRESS') {
        NFTICKET_MASTER_SC_ADDRESS = item.value;
      }
      if (item.key === 'ENGN_SC_ADDRESS') {
        NIGERIA_SERVICE_SC_ADDRESS = item.value;
      }
    });
    const provider = new WalletConnectProvider({
      rpc: {
        44787: 'https://alfajores-forno.celo-testnet.org',
        42220: 'https://forno.celo.org',
      },
      // chainId: 44787,
      connector: connector,
      qrcode: false,
    });
    await provider.enable();
    const web3 = new Web3(provider);
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    let contract = new web3.eth.Contract(
      abi,
      NFTICKET_MASTER_SC_ADDRESS,
      signer,
    );
    contract.defaultAccount = accountId;
    const Approve = await contract.methods
      .withDrawERC20(
        accountId,
        NIGERIA_SERVICE_SC_ADDRESS,
        web3.utils.toWei(amount, 'ether'),
        // web3.utils.toBN(amount).pow(web3.utils.toBN(18)),
        accountId,
      )
      .send({
        from: accountId,
      });
    return {
      data: Approve,
      success: true,
    };
  } catch (error) {
    console.log(error);
    if (error.message) {
      Alert.alert(error.message);
    }
    return {
      success: false,
      data: error,
    };
  }
}
// Get Signature for login
export async function getSignatureLogin(accountId, connector) {
  try {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: 'https://alfajores-forno.celo-testnet.org',
        42220: 'https://forno.celo.org',
      },
      // chainId: 44787,
      connector: connector,
      qrcode: false,
    });
    await provider.enable();
    const web3 = new Web3(provider);
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    address.map(item => {
      if (item.key === 'PROCESSOR_CONTRACT_ADDRESS') {
        PROCESSOR_CONTRACT_ADDRESS = item.value;
      }
    });
    const timeStamp = Math.round(Date.now() / 1000);
    const types = {
      LoginPayload: [
        {name: 'walletAddress', type: 'address'},
        {name: 'timestamp', type: 'uint256'},
      ],
    };
    const values = {
      walletAddress: ethers.utils.getAddress(
        String(accountId).toLowerCase().trim(),
      ),
      timestamp: timeStamp,
    };

    const domain = {
      name: 'NFTicket',
      version: '1',
      verifyingContract: PROCESSOR_CONTRACT_ADDRESS,
      chainId: connector.chainId,
    };
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    // const signature = await connector.signTypedData(domain, types, values);
    const signature = await signer._signTypedData(domain, types, values);

    await deviceStorage.setSignature(signature);
    await deviceStorage.setSigTime(timeStamp.toString());
    return {
      success: true,
      signature: signature,
      timeStamp: timeStamp.toString(),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}
// Get checksum address
export async function getCheckSumAddress(accountId) {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    const address = web3.utils.toChecksumAddress(accountId);
    return {
      success: true,
      address: address,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
}
