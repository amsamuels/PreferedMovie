import { getAllData } from "../src/utils/getRandomFilm";
import { prisma } from "../../movie_rating/src/server/db/client";

const dofill = async () => {
  const movie: any = await getAllData();

  const allMovies = movie.map((movie:any) => ( {    
     name:( movie as{title:string}).title,
     Img: movie.img
   }))


};
dofill();

