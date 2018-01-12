export interface IDisposable {
  dispose(): Promise<void> | void

  on(event: "disposing", cb: () => void);
  on(event: "disposed", cb: () => void);
  on(event: "error", cb: (err:Error) => void);

  off(event: "disposing", cb: () => void);
  off(event: "disposed", cb: () => void);
  off(event: "error", cb: (err:Error) => void);
}