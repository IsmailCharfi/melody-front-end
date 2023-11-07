import { devMode } from "src/api";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { HttpMethod } from "src/misc/enums/Http/HttpMethods";
import { LocalstorageKeys } from "src/misc/enums/LocalStorage/LocalstorageKeys";
import ApiResponse from "src/tools/Fetcher/ApiResponse";

export interface ApiResponseStructure {}

type FetchOptions = {
  token?: string;
  headers?: Headers;
};

export default class Fetcher {
  public constructor(
    public readonly baseUrl: string,
    public readonly headers: Headers = new Headers()
  ) {}

  public get<T>(uri: string, options: FetchOptions = {}) {
    return this.sendRequest<T>(uri, HttpMethod.GET, null, options);
  }

  public post<T>(uri: string, body: any, options: FetchOptions = {}) {
    return this.sendRequest<T>(uri, HttpMethod.POST, body, options);
  }

  public put<T>(uri: string, body: any, options: FetchOptions = {}) {
    return this.sendRequest<T>(uri, HttpMethod.PUT, body, options);
  }

  public delete<T>(uri: string, options: FetchOptions = {}) {
    return this.sendRequest<T>(uri, HttpMethod.DELETE, null, options);
  }

  private async sendRequest<T>(
    uri: string,
    method: HttpMethod,
    body: Object | FormData = null,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const requestBody = body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : null;

    let apiResponse: ApiResponse<T>;

    try {
      const response = await fetch(this.baseUrl + uri, {
        method,
        headers: this.getRequestHeaders(requestBody, options),
        ...(requestBody ? { body: requestBody } : {}),
      });

      const jsonResponse = (await response.json()) as ApiResponse<T>;

      apiResponse = new ApiResponse<T>(jsonResponse);
    } catch (error) {
      if (devMode) console.error(error);
      apiResponse = ApiResponse.createFailedApiResponse<null>(
        null,
        I18nKeys.FETCH_FAILURE
      );
    } finally {
      return apiResponse;
    }
  }

  private getRequestHeaders(body: any, options: FetchOptions = {}): Headers {
    const isFormData = body instanceof FormData;
    const requestHeaders = new Headers();

    const token =
      options?.token ?? window.localStorage.getItem(LocalstorageKeys.TOKEN);

    if (!isFormData) requestHeaders.append("Content-Type", "application/json");

    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }

    requestHeaders.append("Accept", "application/json; plain/text");

    this.headers.forEach((headerValue: string, header: string) =>
      requestHeaders.append(header, headerValue)
    );

    options?.headers?.forEach((header: string) =>
      requestHeaders.append(header, options?.headers[header])
    );

    return requestHeaders;
  }
}
