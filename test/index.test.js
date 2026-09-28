import test from "node:test";
import assert from "node:assert/strict";
import { debounce, throttle } from "../src/index.js";
const wait = ms => new Promise(r=>setTimeout(r,ms));
test("debounces calls", async () => {
  let n=0; const fn=debounce(()=>n++,10); fn(); fn(); fn(); await wait(25); assert.equal(n,1);
});
test("supports leading debounce", async () => {
  let n=0; const fn=debounce(()=>++n,10,{leading:true,trailing:false}); assert.equal(fn(),1); fn(); await wait(20); assert.equal(n,1);
});
test("throttles calls", async () => {
  let n=0; const fn=throttle(()=>n++,20); fn(); fn(); await wait(30); assert.ok(n>=1 && n<=2);
});
