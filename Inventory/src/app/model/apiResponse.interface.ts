export interface APIResponse<T> {
    isSuccess: boolean;
    message: string[];
    result: T;
  }
  