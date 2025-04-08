import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export const fetchWrapper = {
  baseUrl: "",
  headerInit: {},
  create({
    baseUrl = "",
    headers = {},
  }: {
    baseUrl?: string;
    headers?: HeadersInit;
  }) {
    this.baseUrl = baseUrl;
    this.headerInit = headers;
    return this;
  },
  async send(
    path: string,
    method: string = "GET",
    body: null | { [key: string]: unknown } = null,
    headers: HeadersInit = {},
    isServer: boolean = true
  ) {
    try {
      const url = this.baseUrl ? `${this.baseUrl}${path}` : path;
      const headersRequest = new Headers({
        ...this.headerInit,
        ...headers,
      });
      const options: RequestInit = {
        method,
        headers: headersRequest,
      };
      if (body) {
        headersRequest.set("Content-Type", "application/json");
        options.body = JSON.stringify(body);
      }
      let token = null;
      if (isServer) {
        const session: null | { accessToken: string } = await getServerSession(
          authOptions
        );
        if (session) {
          token = session.accessToken;
        }
      } else {
        const session: null | (Session & { accessToken?: string }) =
          await getSession();
        if (session) {
          token = session.accessToken;
        }
      }
      if (token) {
        headersRequest.set("Authorization", `Bearer ${token}`);
      }
      const response: Response & { data?: { [key: string]: unknown } } =
        await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      response.data = data;
      return response;
    } catch (e) {
      return e;
    }
  },

  get(path: string, isServer: boolean = true, headers: HeadersInit = {}) {
    return this.send(path, "GET", null, headers, isServer);
  },

  post(
    path: string,
    isServer: boolean = true,
    body: null | { [key: string]: unknown } = {},
    headers: HeadersInit = {}
  ) {
    return this.send(path, "POST", body, headers, isServer);
  },

  put(
    path: string,
    isServer: boolean = true,
    body: null | { [key: string]: unknown } = {},
    headers: HeadersInit = {}
  ) {
    return this.send(path, "PUT", body, headers, isServer);
  },

  patch(
    path: string,
    isServer: boolean = true,
    body: null | { [key: string]: unknown } = {},
    headers: HeadersInit = {}
  ) {
    return this.send(path, "PATCH", body, headers, isServer);
  },

  delete(
    path: string,
    isServer: boolean = true,
    body: null | { [key: string]: unknown } = {},
    headers: HeadersInit = {}
  ) {
    return this.send(path, "DELETE", body, headers, isServer);
  },
};

export const instance = fetchWrapper.create({
  baseUrl: "https://api.escuelajs.co/api/v1",
});
