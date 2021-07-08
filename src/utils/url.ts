import { useSearchParams } from "react-router-dom";

// --self--
// export const useUrlQueryParam = (keys: string[]) => {
//   // 传入key 数组，返回keyvalue 数组
//   const [searchParams, setSearchParams] = useSearchParams();

//   return [
//     keys.reduce((prev: { [key: string]: string } = {}, key: string) => {
//       return { ...prev, [key]: searchParams.get(key) || "" };
//     }, {}),
//     setSearchParams,
//   ];
// };

export const useUrlQueryParam = (keys: string[]) => {
  // 传入key 数组，返回keyvalue 数组
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    keys.reduce((prev: {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {}),
    setSearchParams,
  ];
};
