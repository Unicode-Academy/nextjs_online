import { use, useEffect, useState } from "react";
import { AppContext } from "../(main-layout)/_components/Provider";
import { FetchWrapper } from "../utils/fetch-wrapper";

// export const useFetch = (baseUrl: string) => {
//   const { accessToken, refreshToken } = use(AppContext);
//   if (!accessToken) {
//     return {
//       fetchWrapper: {} as FetchWrapper,
//       status: "pending",
//     };
//   }
//   const fetchWrapper = new FetchWrapper(baseUrl, {
//     Authorization: `Bearer ${accessToken}`,
//   });
//   fetchWrapper.refreshToken(refreshToken!);
//   return { fetchWrapper, status: "success" };
// };
type OptionTypes = {
  baseUrl: string;
  isAuth: boolean;
};
export const useFetch = <T>(
  callback: (
    fetchWrapper: FetchWrapper
  ) => Promise<(Response & { data?: T; fetchWrapper?: FetchWrapper }) | null>,
  options: OptionTypes = {} as OptionTypes
) => {
  const { accessToken, refreshToken } = use(AppContext);
  const [response, setResponse] = useState<
    (Response & { data?: T; fetchWrapper?: FetchWrapper }) | null
  >({} as Response & { data?: T; fetchWrapper?: FetchWrapper });
  const { baseUrl, isAuth } = options;
  useEffect(() => {
    const handle = async () => {
      if (!accessToken && isAuth) {
        return;
      }
      const fetchWrapper = new FetchWrapper(
        baseUrl,
        accessToken && isAuth
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {}
      );
      fetchWrapper.refreshToken(refreshToken!);
      const response = await callback(fetchWrapper);
      if (response) {
        response.fetchWrapper = fetchWrapper;
      }

      setResponse(response);
    };
    handle();
  }, [accessToken]);
  return response;
};
