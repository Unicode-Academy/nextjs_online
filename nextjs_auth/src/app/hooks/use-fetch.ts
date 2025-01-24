import { use } from "react";
import { AppContext } from "../(main-layout)/_components/Provider";
import { FetchWrapper } from "../utils/fetch-wrapper";

export const useFetch = (baseUrl: string) => {
  const { accessToken, refreshToken } = use(AppContext);
  if (!accessToken) {
    return {
      fetchWrapper: {} as FetchWrapper,
      status: "pending",
    };
  }
  const fetchWrapper = new FetchWrapper(baseUrl, {
    Authorization: `Bearer ${accessToken}`,
  });
  fetchWrapper.refreshToken(refreshToken!);
  return { fetchWrapper, status: "success" };
};
