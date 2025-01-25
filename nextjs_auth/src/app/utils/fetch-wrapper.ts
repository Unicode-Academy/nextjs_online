import { getToken, isClient, makeRefreshToken, saveToken } from "./auth";

export class FetchWrapper {
  #baseUrl: string = "";
  #headers: { [key: string]: string } = {};
  #refreshToken: string = "";
  constructor(baseUrl?: string, headers?: { [key: string]: string }) {
    if (baseUrl) {
      this.#baseUrl = baseUrl;
    }
    this.#headers = headers || {};
  }
  async refreshToken(refreshToken: string) {
    this.#refreshToken = refreshToken;
  }
  async #send<T>(
    path: string,
    method: string,
    data?: null | { [key: string]: unknown },
    options: { headers?: { [key: string]: string } } = {}
  ): Promise<Response & { data?: T }> {
    if (!isClient()) {
      const token = await getToken();
      Object.assign(this.#headers, { Authorization: `Bearer ${token}` });
    }
    const requestInit: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.#headers,
        ...options.headers,
      },
    };

    if (data) {
      requestInit.body = JSON.stringify(data);
    }
    const response: Response & { data?: T } = await fetch(
      `${this.#baseUrl}${path}`,
      requestInit
    );
    if (response.status === 401 && this.#refreshToken && isClient()) {
      const newToken: { access_token: string; refresh_token: string } =
        await makeRefreshToken(this.#refreshToken);
      if (newToken) {
        await saveToken(newToken.access_token, newToken.refresh_token);
        this.#headers.Authorization = `Bearer ${
          (newToken as { access_token: string }).access_token
        }`;
        return this.#send<T>(path, method, data, options);
      }
      if (window.location.pathname !== "/auth/logout") {
        window.location.href = "/auth/logout"; //Đăng xuất
      }
    }
    response.data = await response.json();
    return response;
  }
  async get<T>(path: string, options = {}) {
    return this.#send<T>(path, "GET", null, options);
  }
  async post<T>(
    path: string,
    data: null | { [key: string]: unknown } = null,
    options = {}
  ) {
    return this.#send<T>(path, "POST", data, options);
  }

  async put<T>(
    path: string,
    data: null | { [key: string]: unknown } = null,
    options = {}
  ) {
    return this.#send<T>(path, "PUT", data, options);
  }

  async patch<T>(
    path: string,
    data: null | { [key: string]: unknown } = null,
    options = {}
  ) {
    return this.#send<T>(path, "PATCH", data, options);
  }

  async delete<T>(path: string, options = {}) {
    return this.#send<T>(path, "DELETE", null, options);
  }
}
