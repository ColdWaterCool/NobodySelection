export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T | null;
  timestamp: string;
  path: string;
}