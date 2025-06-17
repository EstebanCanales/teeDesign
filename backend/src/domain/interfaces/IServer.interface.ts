export interface IServer {
  start(): Promise<void>;
  stop(): Promise<void>;
  getApp(): any;
}
