import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
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
