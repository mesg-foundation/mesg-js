const base = require('base-x')
const bs58 = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

export const decode: (string: string) => Buffer = bs58.decode
export const encode: (source: Buffer) => string = bs58.encode
