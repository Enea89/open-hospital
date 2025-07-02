import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";

export function useGetDetail<T extends object>(
  getDetailApi: (id: number) => Promise<AxiosResponse<T>>,
  newRecord: T,
  id: number
) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<T>(newRecord);
  const getDetail = useCallback(() => {
    setLoading(true);
    getDetailApi(id)
      .then((response) => {
        setRecord({ ...newRecord, ...response.data });
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getDetailApi, newRecord, setLoading, setRecord]);

  useEffect(getDetail, []);

  return [record, loading, getDetail] as [T, boolean, () => void];
}

export default useGetDetail;
