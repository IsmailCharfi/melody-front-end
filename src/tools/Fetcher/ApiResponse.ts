import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { HttpStatus } from "src/misc/enums/Http/HttpStatus";
import { ApiResponseStructure } from "./Fetcher";

export default class ApiResponse<T = any> implements ApiResponseStructure {
  status: number;

  data: T;

  message: string;

  isOk: boolean;

  constructor(apiResponse: Partial<ApiResponse<T>> = {}) {
    this.status = apiResponse.status ?? HttpStatus.InternalServerError;
    this.data = apiResponse.data ?? null;
    this.isOk = this?.status && this.status > 199 && this.status < 300;
    this.message =
      apiResponse.message ??
      (this.isOk ? I18nKeys.FETCH_SUCCESS : I18nKeys.FETCH_FAILURE);
  }

  static createSuccessApiResponse<T>(
    data: T,
    message: string = "",
    created: boolean = false
  ) {
    return new ApiResponse<T>({
      status: created ? 201 : 200,
      data,
      message,
    });
  }

  static createFailedApiResponse<T>(
    data: T,
    message: string = "",
    status: number = 500
  ) {
    return new ApiResponse<T>({
      status,
      data,
      message,
    });
  }
}
