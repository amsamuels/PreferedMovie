import { GetServerSideProps } from "next";
import {AsyncReturnType} from "type-fest";
import Image from "next/image";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

 const getFilmInOrder = async () => {
  return await prisma.film.findMany({
    orderBy: {
      VoteFor:{ _count: "desc"}
    },
    select: {
        id: true,
        name: true,
        img: true,
            _count: {
                select: {
                    VoteFor: true,
                    VoteAgainst: true,
                }
            }
    },
  });
}
type FilmQueryResult = AsyncReturnType<typeof getFilmInOrder>;

const generateCountPercent = (film: FilmQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = film._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const FilmListing: React.FC<{ film: FilmQueryResult[number], rank:number}> = ({film,rank}) => {
  return (
    <div className="relative overflow-x-auto bg-white/10 shadow-md m-2">
    <table className="w-full text-sm text-left  ">
        <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
                <td className="w-32 p-4">
                <Image src={film?.img} alt="imgsec" width={116}height={116} className=" ml-auto mr-auto" />
                </td>
                <td className="px-2 py-4 font-semibold text-gray-900 ">
                {film?.name}
                </td>
                <td className="px-2 py-4 font-semibold text-end text-gray-900 ">
                {generateCountPercent(film).toFixed(2) + "%"}
                </td>
                <td className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-purple-600 border border-purple-500 shadow-lg rounded-br-md">
                  {rank}
                </td>
                <td className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 mt-[155px]  font-semibold text-white bg-purple-600 border border-purple-500 shadow-lg rounded-br-md">
                {film._count.VoteFor} Votes
                </td>
            </tr>
        </tbody>
    </table>
</div>
  );
};

const ResultPage: React.FC<{film:FilmQueryResult}> = (props) => {
  return (
      <div className="flex flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <h1 className="text-white text-2xl font-bold leading-none">Results</h1>
      <div className="flex flex-col w-full max-w-2xl border">
      </div>
      <div className="">
      {props.film
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentFilm, index) => {
            return <FilmListing film={currentFilm} key={index} rank={index + 1} />;
          })}
     
      </div>
      </div>
  );
}

export default ResultPage;

export const getStaticProps: GetServerSideProps = async () => {
  const filmsOrdered = await getFilmInOrder();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return {props: {film:filmsOrdered}, revalidate: DAY_IN_SECONDS}
}