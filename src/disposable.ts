import { IDisposable } from "./_disposable";
import { EventEmitter } from "events";

export abstract class Disposable implements IDisposable {
  private _disposeList: (() => Promise<void> | void)[] = [];
  protected _events = new EventEmitter();

  protected addDisposer(disposable: () => Promise<void> | void) {
    if(this._disposeList === undefined){
      throw Error("cannot add to disposable as it is already disposed");
    }
    this._disposeList.push(disposable);
  }

  async dispose(): Promise<void> {
    if (this._disposeList === undefined)
      return;

    this._events.emit("disposing");

    for (let dispose of this._disposeList) {
      try {
        await dispose();
      }
      catch (err) {
        this._events.emit("error", err);
      }
    }

    this._events.emit("disposed");
    this._events.removeAllListeners();
    this._disposeList = undefined;
  }

  on(event: "disposing", cb: () => void);
  on(event: "disposed", cb: () => void);
  on(event: "error", cb: (err: Error) => void);
  on(event: string, cb: any) {
    this._events.addListener(event, cb);
  }

  off(event: "disposing", cb: () => void);
  off(event: "disposed", cb: () => void);
  off(event: "error", cb: (err: Error) => void);
  off(event: string, cb: any) {
    this._events.removeListener(event, cb);
  }
}