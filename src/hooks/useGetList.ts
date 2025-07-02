import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";

export function useGetList<T extends object, F extends object>(
  getListApi: (
    page: number,
    size: number,
    sort: string,
    filter: F,
    options?: AxiosRequestConfig<any> | undefined
  ) => Promise<AxiosResponse<T[]>>,
  filter: F,
  manualTrigger: boolean = false
) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<T[]>([]);

  const getList = useCallback(() => {
    setLoading(true);
    getListApi(0, 100, "id,asc", filter)
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, getListApi, enqueueSnackbar]);

  useEffect(() => {
    if (!manualTrigger) {
      getList();
    }
  }, [getList, manualTrigger]);

  return [records, loading, getList] as [T[], boolean, () => void];
}

export default useGetList;
