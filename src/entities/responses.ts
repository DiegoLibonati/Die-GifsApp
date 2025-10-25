import { Gif } from "@src/entities/app";

export type GetGifsResponse = {
  data: Gif[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
};

export type GetRandomGifsCategoryResponse = {
  data: Gif;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
};
