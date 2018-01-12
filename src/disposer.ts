import { Disposable } from "./disposable";

export class Disposer extends Disposable {
  public addDisposer(disposable: () => Promise<void> | void) {
    super.addDisposer(disposable);
  }
}