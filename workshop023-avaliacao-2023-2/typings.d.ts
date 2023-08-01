declare module 'http' {
  export interface IncomingMessage {
    container: import('./src/container').Container;
  }
}
