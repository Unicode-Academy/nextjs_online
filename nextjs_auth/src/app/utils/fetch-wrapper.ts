export class FetchWrapper {
  #baseUrl: string = "";
  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.#baseUrl = baseUrl;
    }
  }
  async get(path: string, options = {}) {
    const response: Response & { data?: unknown } = await fetch(
      `${this.#baseUrl}${path}`,
      options
    );
    response.data = await response.json();
    return response;
  }
  async post(path: string, data: null | { [key: string]: unknown } = null) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async put(path: string, data: null | { [key: string]: unknown } = null) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async patch(path: string, data: null | { [key: string]: unknown } = null) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(path: string) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "DELETE",
    });
    return response.json();
  }
}
