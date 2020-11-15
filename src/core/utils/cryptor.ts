import {createCipheriv, createDecipheriv} from "crypto";

export const DB_KEY = "tinyreborn";
const AES = "aes-256-cbc";
// For config encryption only
export function encryptAES(buffer: Buffer, password: string): Buffer {
  const cipher = createCipheriv(AES,
    Buffer.alloc(32, password, "utf8"),
    Buffer.alloc(16, password, "utf8"),
  );
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

// For config encryption only
export function decryptAES(buffer: Buffer, password: string): Buffer {
  const decipher = createDecipheriv(AES,
    Buffer.alloc(32, password, "utf8"),
    Buffer.alloc(16, password, "utf8"),
  );
  return Buffer.concat([decipher.update(buffer) , decipher.final()]);
}
