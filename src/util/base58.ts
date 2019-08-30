const base = require('base-x')
const bs58 = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

export const decode: (value: string) => Buffer = bs58.decode
export const encode = (value: Uint8Array): string => bs58.encode(Buffer.from(value))
