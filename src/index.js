export function debounce(fn, wait, options = {}) {
  if (typeof fn !== "function") throw new TypeError("Expected fn to be a function");
  if (typeof wait !== "number" || wait < 0 || !Number.isFinite(wait)) throw new RangeError("Expected wait to be a non-negative finite number");
  const { leading = false, trailing = true } = options;
  let timer = null, lastArgs, lastThis, result;
  const invoke = () => { timer=null; if (trailing && lastArgs) { result=fn.apply(lastThis,lastArgs); lastArgs=lastThis=null; } };
  function wrapped(...args) {
    const callNow = leading && timer === null;
    lastArgs=args; lastThis=this;
    if (timer !== null) clearTimeout(timer);
    timer=setTimeout(invoke,wait);
    if (callNow) { result=fn.apply(lastThis,lastArgs); lastArgs=lastThis=null; }
    return result;
  }
  wrapped.cancel=()=>{ if(timer!==null)clearTimeout(timer); timer=null; lastArgs=lastThis=null; };
  wrapped.flush=()=>{ if(timer!==null){clearTimeout(timer); invoke();} return result; };
  return wrapped;
}

export function throttle(fn, wait, options = {}) {
  if (typeof fn !== "function") throw new TypeError("Expected fn to be a function");
  const { leading = true, trailing = true } = options;
  let last = 0, timer = null, lastArgs, lastThis, result;
  function invoke(time){ last=time; timer=null; result=fn.apply(lastThis,lastArgs); lastArgs=lastThis=null; }
  function wrapped(...args){
    const now=Date.now();
    if (!last && !leading) last=now;
    const remaining=wait-(now-last);
    lastArgs=args; lastThis=this;
    if (remaining<=0 || remaining>wait) { if(timer){clearTimeout(timer);timer=null;} invoke(now); }
    else if (!timer && trailing) timer=setTimeout(()=>invoke(leading?Date.now():0),remaining);
    return result;
  }
  wrapped.cancel=()=>{ if(timer)clearTimeout(timer); timer=null; last=0; lastArgs=lastThis=null; };
  return wrapped;
}
