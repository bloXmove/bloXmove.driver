import {Wallet} from 'ethers';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Creates random wallet, stores its mnemonic into the encrypted storage.
 * @returns {ethers.Wallet}
 */
export async function createNewWallet() {
  const wallet = Wallet.createRandom();

  try {
    await EncryptedStorage.setItem(
      'local_wallet_mnemonic',
      JSON.stringify(wallet.mnemonic),
    );
  } catch (err) {
    console.error(err);
  }

  return wallet;
}

/**
 * Retrieves wallet’s mnemonic from the encrypted storage and instantiates the wallet from it.
 * If mnemonic does not exists in the encrypted storage, this function falls back to createNewWallet()
 * @returns {ethers.Wallet}
 */
export async function getLocalWallet() {
  let mnemonic, wallet;

  try {
    mnemonic = await EncryptedStorage.getItem('local_wallet_mnemonic');
    mnemonic = JSON.parse(mnemonic);
  } catch (err) {
    console.error(err);
  }

  if (mnemonic) {
    wallet = Wallet.fromMnemonic(mnemonic.phrase, mnemonic.path);
  } else {
    wallet = await createNewWallet(); // fallback
  }

  return wallet;
}

/**
 * Retrieves wallet’s mnemonic from the encrypted storage and instantiates the wallet from it and return exist flag
 * If mnemonic does not exists in the encrypted storage, this function falls back to createNewWallet()
 * @returns {ethers.Wallet}
 */
export async function getLocalWalletAddress() {
  let mnemonic, wallet, exist;

  try {
    mnemonic = await EncryptedStorage.getItem('local_wallet_mnemonic');
    mnemonic = JSON.parse(mnemonic);
  } catch (err) {
    console.error(err);
  }

  if (mnemonic) {
    wallet = Wallet.fromMnemonic(mnemonic.phrase, mnemonic.path);
    exist = true;
  } else {
    exist = false;
  }

  return {
    wallet: wallet,
    exist: exist,
  };
}
/**
 * Creates wallet from mnemonic and stores the mnemonic into the encrypted storage.
 * @returns {(ethers.Wallet|false)}
 */
export async function restoreWallet(mnemonic_phrase) {
  let wallet;

  try {
    wallet = Wallet.fromMnemonic(mnemonic_phrase);
    await EncryptedStorage.setItem(
      'local_wallet_mnemonic',
      JSON.stringify(wallet.mnemonic),
    );
  } catch (err) {
    console.error(err);
    return false;
  }

  return wallet;
}

/**
 * Return recovery phrase.
 * @returns {(ethers.Wallet|false)}
 */
export async function getPhrase() {
  let local_wallet_mnemonic;
  try {
    local_wallet_mnemonic = await EncryptedStorage.getItem(
      'local_wallet_mnemonic',
    );
    local_wallet_mnemonic = JSON.parse(local_wallet_mnemonic);
    if (local_wallet_mnemonic) {
      return local_wallet_mnemonic.phrase;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Clear Local Wallet
 * @returns {(true|false)}
 */
export async function clearLocalWallet() {
  try {
    await EncryptedStorage.removeItem('local_wallet_mnemonic');
  } catch (err) {
    return false;
  }
}
/**
 * Creates random wallet, encrypts it with the password and stores encrypted JSON-wallet into the encrypted storage.
 * @param {string} password
 * @returns {ethers.Wallet}
 */
export async function createNewEncryptedWallet(password) {
  const wallet = Wallet.createRandom();
  const encrypted_wallet = await wallet.encrypt(password, progress =>
    console.log('wallet encryption progress:', progress),
  );

  try {
    await EncryptedStorage.setItem('encrypted_local_wallet', encrypted_wallet);
  } catch (err) {
    console.error(err);
  }

  return wallet;
}

/**
 * Retrieves encrypted JSON-wallet from the encrypted storage and decrypts it using the password.
 * If JSON-wallet not exists in the encrypted storage, this function falls back to createNewEncryptedWallet()
 * @param {string} password
 * @returns {ethers.Wallet}
 */
export async function getDecryptedLocalWallet(password) {
  let encrypted_wallet, wallet;

  try {
    encrypted_wallet = await EncryptedStorage.getItem('encrypted_local_wallet');
  } catch (err) {
    console.error(err);
  }

  if (encrypted_wallet) {
    wallet = await Wallet.fromEncryptedJson(
      encrypted_wallet,
      password,
      progress => console.log('wallet decryption progress:', progress),
    );
  } else {
    wallet = await createNewEncryptedWallet(password); // fallback
  }

  return wallet;
}
