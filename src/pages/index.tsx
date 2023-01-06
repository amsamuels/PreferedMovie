import { type NextPage } from "next";
import Head from "next/head";
import { getOptionsForVote } from "../utils/getRandomFilm";
import { getAllData } from "../utils/getRandomFilm";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import Image from "next/image";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first , second] = ids;
  const firstFilm: any = trpc.movie.getfilbyID.useQuery({ id: first});
  const secondFilm: any = trpc.movie.getfilbyID.useQuery({ id: second});
  const sendVote = trpc.movie.voteCast.useMutation({});

  if (firstFilm.isLoading || secondFilm.isLoading) return null;

  const voteRating = (selected: number) => {
    if (selected === first) {
      sendVote.mutate({votedFor: first , votedAgainst: second as number });
    }else{
      sendVote.mutate({votedFor: second as number, votedAgainst: first  as number });
    }
    updateIds(getOptionsForVote());
  }
  return (
    <>
      <Head>
        <title>Film Rating App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Which Movie Did <span className="text-[hsl(280,100%,70%)]">You</span> Prefer?
          </h1>
          <div className="container ml-auto mr-auto flex gap-4 flex-col sm:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
              <div className="bg-white/10 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                <figure className="mb-2">
                <Image src={firstFilm.data?.movie.img} alt="imgsec" width={226}height={226} className=" ml-auto mr-auto" />
                </figure>
                <div className="rounded-lg p-4 bg-purple-600 flex flex-col">
                  <div>
                    <h5 className="text-white text-2xl font-bold leading-none">
                      {firstFilm.data?.movie.title}
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <div className="text-lg  text-white mt-2 font-light">
                      <button onClick={() => voteRating(first as number)} className="rounded-xl p-2 bg-white/30 font-bold">Preferred</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" text-white p-2 items-center hover:bg-white/20"
            >
              <h3 className="text-2xl items-center truncate font-bold">⬅️ VS ➡️</h3>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
              <div className="bg-white/10 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                <figure className="mb-2">
                  <Image src={secondFilm.data?.movie.img} alt="imgsec" width={226}height={226} className=" ml-auto mr-auto" />
                </figure>
                <div className="rounded-lg p-4 bg-purple-600 flex flex-col">
                  <div>
                    <h5 className="text-white text-2xl font-bold leading-none">
                      {secondFilm.data?.movie.title}
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <div className="text-lg  text-white mt-2 font-light">
                      <button onClick={() => voteRating(second as number)} className="rounded-xl p-2 bg-white/30 font-bold">Preferred</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
