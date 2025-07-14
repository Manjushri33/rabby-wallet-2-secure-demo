import { encryptKeys, decryptKeys } from './encryption';

export class WalletController {
  private encryptedKeys: string | null = null;
  private decryptedKeys: string[] | null = null;
  private password: string | null = null;

  async importWallet(mnemonic: string, password: string) {
    // Тут створюємо ключі з seed (для демо повернемо mock)
    const keys = [ 'privkey1', 'privkey2' ]; 

    this.encryptedKeys = await encryptKeys(keys, password);
    this.password = password;
    this.decryptedKeys = keys;

    console.log('Wallet imported and keys encrypted');
  }

  async unlock(password: string) {
    if (!this.encryptedKeys) throw new Error('Wallet not imported');
    this.decryptedKeys = await decryptKeys(this.encryptedKeys, password);
    this.password = password;
    console.log('Wallet unlocked');
  }

  lock() {
    this.password = null;
    this.decryptedKeys = null;
    console.log('Wallet locked');
  }

  async signTransaction(tx: any) {
    if (!this.password || !this.decryptedKeys) throw new Error('Wallet locked');
    // Демонстрація - підпис просто рядок
    return `signed(${JSON.stringify(tx)})`;
  }
}
