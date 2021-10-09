import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

// --self--
export const useUrlQueryParam1 = (keys: string[]) => {
  // 传入key 数组，返回keyvalue 数组
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    keys.reduce((prev: { [key: string]: string } = {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {}),
    setSearchParams,
  ];
};

// export const useUrlQueryParam = (keys: string[]) => {
//   // 传入key 数组，返回keyvalue 数组
//   const [searchParams, setSearchParams] = useSearchParams();

//   return [
//     keys.reduce((prev, key: string) => {
//       return { ...prev, [key]: searchParams.get(key) || "" };
//     }, {} as { [key in string]: string }),
//     setSearchParams,
//   ] as const;
// };

//  --self--
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   // 只有keys 和value发生改变时 需要重新计算
//   console.log(keys);
//   return [
//     useMemo(() => {
//       return keys.reduce((prev, key) => {
//         return { ...prev, [key]: searchParams.get(key) || "" };
//       }, {} as { [key in K]: string });
//     }, [JSON.stringify(keys)]),
//     setSearchParams,
//   ] as const;
// };

//  --self--
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   // 只有keys 和value发生改变时 需要重新计算
//   console.log(keys);
//   return [
//     useMemo(() => {
//       return keys.reduce((prev, key) => {
//         return { ...prev, [key]: searchParams.get(key) || "" };
//       }, {} as { [key in K]: string });
//     }, [JSON.stringify(keys)]),
//     setSearchParams,
//   ] as const;
// };

//  --self--
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 只有keys 和value发生改变时 需要重新计算
  console.log(keys);
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    // --self--
    // (params: { [key in K]: string }) => {
    //   setSearchParams(params);
    // },
    // (params: Partial<{ [key in K]: unknown }>) => {
    //   setSearchParams(params as URLSearchParamsInit);
    // },
    (params: Partial<{ [key in K]: unknown }>) => {
      // 合并
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params });
      setSearchParams(o as URLSearchParamsInit);
    },
  ] as const;
};
