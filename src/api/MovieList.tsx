import axios from 'axios';
import { MovieType, MovieResponse, BoxOfficeResponse } from "../types/MovieType";

export const fetchMovies = async () => {
    try {
      const response = await axios.get<MovieResponse>('https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=923AT6VA7NPY9SRIQ6T2&releaseDts=20240801&releaseDte=20240905');
      console.log(response.data);
      return response.data.Data[0].Result;
    } catch (error) {
      console.error('API 요청 에러:', error);
      throw error;
    }
  };

  export const fetchBoxOffice = async () => {
    try {
      const response = await axios.get<BoxOfficeResponse>('https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c9777b972b29ca8836e49e0abd905799&targetDt=20240925');
      console.log(response.data.boxOfficeResult.dailyBoxOfficeList);
      return response.data.boxOfficeResult.dailyBoxOfficeList
    } catch (error) {
      console.error('API 요청 에러:', error);
      throw error;
    }
  };