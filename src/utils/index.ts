import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 在一个函数里，改变传入的对象本身是不好的
// ts 中的object 包括函数
// 纯对象可用 {[key: string]: unknown }
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
    // TODO: 依赖项里加上callback会造成无线循环，这个和useCallback 和useMemo 有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const debounce = (fn:(par:unknown)=>void, delay:number) => {
//   let time:unknown;
//   return (...param:unknown) => {
//     if (time) {
//       clearTimeout(time);
//     }
//     time = setTimeout(() => {
//       fn(...param);
//     }, delay);
//   };
// };

export const useDebounce = <V>(value: V, delay?: number) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    let time = setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return val;
};

export const useArray = <T>(initValue: T[]) => {
  const [value, setValue] = useState(initValue);
  const clear = () => setValue([]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };
  const add = (item: T) => [...value, item];
  return { value, clear, removeIndex, add, setValue };
};
