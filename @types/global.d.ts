interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: undefined;
}

interface FailResponse {
  success: false;
  data?: undefined;
  message: string;
}

type Result<T> = SuccessResponse<T> | FailResponse;
type FetchReturn<T> = Promise<Result<T>>;
