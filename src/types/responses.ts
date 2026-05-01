export interface DefaultResponse {
  code: string;
  message: string;
}

export interface ResponseWithData<T> extends DefaultResponse {
  data: T;
}

export type ResponseDirect<T> = T;

export interface ResponseMetaData<T> {
  data: T;
  meta?: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
}
