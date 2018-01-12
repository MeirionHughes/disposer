import { expect } from 'chai';
import { Disposer } from '../src/disposer';
import { using } from '../src/using';
import { Disposable } from '../src/disposable';

describe("Disposer", () => {
  it("should call dispose entry", async () => {
    let wasCalled = false;
    await using(new Disposer(), async (disposer) => {    
      disposer.addDisposer(()=>{
        wasCalled = true;
      })    
    });

    expect(wasCalled).to.be.true;
  });
})