import {ethers} from 'ethers';
import {getProvider, getSigner} from '@app/src/lib/WalletFacade';
import {Alert} from 'react-native';
import deviceStorage from '../../../utils/AuthDeviceStorage';
import {setNFTBalance} from '../../redux/actions.js';
import {testnet} from '@app/src/lib/config';
import {displayEtherErrors} from '@app/src/helpers/displayErrors.js';
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
    address.map(item => {
      if (item.key === 'NFTICKET_MASTER_SC_ADDRESS') {
        NFTICKET_MASTER_SC_ADDRESS = item.value;
      }
      if (item.key === 'ENGN_SC_ADDRESS') {
        ENGN_SC_ADDRESS = item.value;
      }
    });

    const contract = new ethers.Contract(
      NFTICKET_MASTER_SC_ADDRESS,
      abi,
      getProvider(),
    );
    const r = await contract.getServiceProviderPoolSize(
      accountId,
      ENGN_SC_ADDRESS,
    );
    // const allowance = r.toNumber();
    // const allowance = (r / Math.pow(10, 18)).toFixed(0);
    return {
      success: true,
      data: r,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error,
    };
  }
}

export function changeNFTBalance(accountId) {
  return async function (dispatch) {
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
      address.map(item => {
        if (item.key === 'NFTICKET_MASTER_SC_ADDRESS') {
          NFTICKET_MASTER_SC_ADDRESS = item.value;
        }
        if (item.key === 'ENGN_SC_ADDRESS') {
          ENGN_SC_ADDRESS = item.value;
        }
      });

      const contract = new ethers.Contract(
        NFTICKET_MASTER_SC_ADDRESS,
        abi,
        getProvider(),
      );
      const r = await contract.getServiceProviderPoolSize(
        accountId,
        ENGN_SC_ADDRESS,
      );
      // const allowance = r.toNumber();
      const data = (r / Math.pow(10, 18)).toFixed(0);
      dispatch(setNFTBalance({data: data}));
      return {
        success: true,
        data: r,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: error,
      };
    }
  };
}

export async function getSignature(accountId, connector, message) {
  try {
    const address = JSON.parse(await deviceStorage.getNFTAddress());
    address.map(item => {
      if (item.key === 'PROCESSOR_CONTRACT_ADDRESS') {
        PROCESSOR_CONTRACT_ADDRESS = item.value;
      }
    });

    // EIP712
    const types = {
      JourneyPayload: [
        {name: 'latitude', type: 'string'},
        {name: 'longitude', type: 'string'},
        {name: 'locationName', type: 'string'},
        {name: 'timestamp', type: 'uint256'},
      ],
    };

    const provider = getProvider();
    const {chainId} = await provider.getNetwork();
    const domain = {
      name: 'NFTicket',
      version: '1',
      verifyingContract: PROCESSOR_CONTRACT_ADDRESS,
      chainId,
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
    const signer = await getSigner();
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
  const provider = getProvider();
  let balance = await provider.getBalance(accountId);
  balance = ethers.utils.formatEther(balance);
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

    const signer = await getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.approve(spender, ethers.utils.parseEther(amount));

    return {
      success: true,
    };
  } catch (error) {
    displayEtherErrors(error);
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

    const signer = await getSigner();
    const contract = new ethers.Contract(
      NFTICKET_MASTER_SC_ADDRESS,
      abi,
      signer,
    );
    const Approve = await contract[
      'withDrawERC20(address,address,uint256,address)'
    ](
      accountId,
      NIGERIA_SERVICE_SC_ADDRESS,
      ethers.utils.parseEther(amount),
      accountId,
    );
    await Approve.wait();
    return {
      data: Approve,
      success: true,
    };
  } catch (error) {
    displayEtherErrors(error);
    return {
      success: false,
      data: error,
    };
  }
}
// Get Signature for login
export async function getSignatureLogin(accountId, connector) {
  try {
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

    const provider = getProvider();
    const {chainId} = await provider.getNetwork();
    const domain = {
      name: 'NFTicket',
      version: '1',
      verifyingContract: PROCESSOR_CONTRACT_ADDRESS,
      chainId,
    };

    const signer = await getSigner();
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
    const address = ethers.utils.getAddress(
      String(accountId).toLowerCase().trim(),
    );
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
