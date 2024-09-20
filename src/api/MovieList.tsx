import axios from 'axios';
import { MovieType, ApiResponse } from "../types/MovieType";

export const fetchMovies = async () => {
    try {
      const response = await axios.get<ApiResponse>('http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=923AT6VA7NPY9SRIQ6T2&title=베테랑2');
      console.log(response.data.Data[0].Result);
      return response.data.Data[0].Result;
    } catch (error) {
      console.error('API 요청 에러:', error);
      throw error;
    }
  };