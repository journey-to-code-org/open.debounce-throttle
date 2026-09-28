export interface TimingOptions { leading?: boolean; trailing?: boolean; }
export interface Debounced<T extends (...args:any[])=>any> { (...args: Parameters<T>): ReturnType<T> | undefined; cancel(): void; flush(): ReturnType<T> | undefined; }
export interface Throttled<T extends (...args:any[])=>any> { (...args: Parameters<T>): ReturnType<T> | undefined; cancel(): void; }
export function debounce<T extends (...args:any[])=>any>(fn:T, wait:number, options?:TimingOptions):Debounced<T>;
export function throttle<T extends (...args:any[])=>any>(fn:T, wait:number, options?:TimingOptions):Throttled<T>;
