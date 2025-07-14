const encoder = new TextEncoder();
const decoder = new TextDecoder();

export async function encryptKeys(keys: string[], password: string): Promise<string> {
  const data = encoder.encode(JSON.stringify(keys));
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(password), { name: 'AES-GCM' }, false, ['encrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return JSON.stringify({ iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) });
}

export async function decryptKeys(encrypted: string, password: string): Promise<string[]> {
  const obj = JSON.parse(encrypted);
  const iv = new Uint8Array(obj.iv);
  const data = new Uint8Array(obj.data);
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(password), { name: 'AES-GCM' }, false, ['decrypt']
  );
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return JSON.parse(decoder.decode(decrypted));
}
