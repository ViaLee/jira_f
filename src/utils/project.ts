import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const { run, isLoading, data: list } = useAsync<Project[]>();
  const client = useHttp();

  const debounceParam = useDebounce(param, 500);

  useEffect(() => {
    run(client("projects", { data: cleanObject(debounceParam || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  return { list, isLoading };
};
