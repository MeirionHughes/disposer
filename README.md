# Disposer

an async disposer and abstract disposable class

## Class: Disposable

```ts 
import { Disposable, using, Disposer } from "disposer";

class Foo extends Disposable {
  
  constructor(){
    super();

    this.addDisposer(()=>{
      console.log("clean up something");
    })
  }
}

let foo = new Foo();

foo.on("disposing", ()=>console.log("disposing"));
foo.on("disposed", ()=>console.log("disposed"));

async function main(){
  await foo.dispose();
}

main().catch(console.log);
```

## Class: Disposer

```ts
let foo = new Disposer();

foo.addDisposer(()=>{
  console.log("clean up something");
})
```

## Function: using

```ts
async function main(){
  await using(new Foo(), (foo)=>{
    //do something 
  });
  //foo disposed
}
```