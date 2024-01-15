import {
  getLocalWallet,
  createNewWallet,
  restoreWallet,
  getLocalWalletAddress,
} from './LocalWallet';
import {providers} from 'ethers';
const {JsonRpcProvider} = providers;
import {testnet} from './config';

/** ethers.providers.JsonRpcProvider */
let provider;

/** ethers.Signer */
let signer;
// Exist flag
let exist;

/**
 * Sets the global provider and, consequently, the signer.
 * Used to attach WalletConnect's provider/signer to the WalletFacade.
 * When null is passed as the argument, it clears the global provider/signer.
 * @param {ethers.providers.JsonRpcProvider} _provider
 */
export function setProvider(_provider) {
  if (_provider === null) {
    provider = null;
    signer = null;
    return;
  }
  provider = new providers.Web3Provider(_provider);
  signer = provider.getSigner();
}

/**
 * Returns the global provider: either local JsonRpcProvider or preset from setProvider()
 * @returns {ethers.providers.JsonRpcProvider}
 */
export function getProvider() {
  if (!provider) {
    provider = new JsonRpcProvider(testnet);
  }
  return provider;
}

/**
 * Returns the global signer: either local wallet or preset signer from setProvider()
 * @returns {ethers.Wallet}
 */
export async function getSigner() {
  if (!signer) {
    signer = await getLocalWallet();
    signer = signer.connect(getProvider());
  }
  return signer;
}

/**
 * Returns the global signer: either local wallet or preset signer from setProvider() and return exist flag
 * @returns {ethers.Wallet}
 */
export async function getLocalSigner() {
  if (!signer) {
    let localAddress = '';
    localAddress = await getLocalWalletAddress();
    if (localAddress.exist) {
      signer = localAddress.wallet;
      exist = localAddress.exist;
      signer = signer.connect(getProvider());
    }
  } else {
    exist = true;
  }
  return {
    signer: signer,
    exist: exist,
  };
}

/**
 * Returns new wallet
 * @returns {ethers.Wallet}
 */
export async function createSinger() {
  try {
    signer = await createNewWallet();
    signer = signer.connect(getProvider());
    return signer;
  } catch {
    return false;
  }
}

/**
 * Returns restored wallet
 * @returns {ethers.Wallet}
 */
export async function restoreSinger(mnemonic_phrase) {
  try {
    signer = await restoreWallet(mnemonic_phrase);
    signer = signer.connect(getProvider());
    return signer;
  } catch {
    return false;
  }
}
