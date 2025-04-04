interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: unknown;
}

interface FailResponse {
  success: false;
  data?: unknown;
  message: string;
}

type Result<T> = SuccessResponse<T> | FailResponse;
type FetchReturn<T> = Promise<Result<T>>;
