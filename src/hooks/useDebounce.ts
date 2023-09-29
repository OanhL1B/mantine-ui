import { useEffect, useCallback, DependencyList, useRef } from "react";

type ReturnTimeout = ReturnType<typeof setTimeout>; 

function useDebounce(
  func: (...rest) => void,
  ms: number,
  deps: DependencyList = []
) {
  const destroy = useRef<ReturnTimeout>(null);
  const callback = useRef(null);

  useEffect(() => {
    callback.current = func;
  }, [func]);

  const initTimeout = useCallback(() => {
    clear();
    destroy.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    destroy.current && clearTimeout(destroy.current);
  }, []);

  useEffect(() => {
    initTimeout();
    return clear;
  }, deps);
  return [initTimeout, clear];
}
export default useDebounce;
