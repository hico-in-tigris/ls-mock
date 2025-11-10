type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex';

type Buffer = Uint8Array;

declare module 'fs/promises' {
  export function readFile(path: string, options?: { encoding?: BufferEncoding | null }): Promise<string | Buffer>;
  export function writeFile(path: string, data: string | Uint8Array, options?: { encoding?: BufferEncoding | null }): Promise<void>;
  export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function access(path: string): Promise<void>;
}
