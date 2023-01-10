import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import Image from "next/image";
import { usePlausible } from "next-plausible";



const Home: NextPage = () => {
  const { data: filmPair, refetch } = trpc.movie.getfilbyID.useQuery();
  const sendVote = trpc.movie.voteCast.useMutation({});
  const plausible = usePlausible();

  if (!filmPair) return (
    <div className='flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl'>
      <div className='h-6 bg-purple-300 mt-5 rounded-md'></div>
      <div className='h-40 bg-purple-300 mt-5 rounded-md'></div>
      <div className='h-8 bg-purple-300 mt-5 rounded-md'></div>
      <div className='h-40 bg-purple-300 mt-5 rounded-md'></div>
    </div>
  )

  const voteRating = (selected: number) => {
    if (selected === filmPair.filmOne?.id) {
      sendVote.mutate({ votedFor: filmPair.filmOne.id as number, votedAgainst: filmPair.filmTwo.id });
    } else {
      sendVote.mutate({ votedFor: filmPair.filmTwo.id as number, votedAgainst: filmPair.filmOne.id });
    }
    plausible(sendVote ? "Vote" : "Vote");
    refetch();
  }
  return (
    <>
      <Head>
        <title>Film Rating App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Which Movie Did <span className="text-[hsl(280,100%,70%)]">You</span> Prefer?
          </h1>
          <div className="container ml-auto mr-auto flex gap-4 flex-col sm:flex-row justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
              <div onClick={() => voteRating(filmPair?.filmOne?.id as number)}  className="bg-white/10 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                <figure className="mb-2">
                  {filmPair && <Image src={filmPair.filmOne?.img} alt="imgsec" width={166} height={166} className=" ml-auto mr-auto" />}
                </figure>
                <div className="rounded-lg p-4 bg-purple-600 flex flex-col">
                  <div>
                    {filmPair && <h5 className="text-white text-2xl font-bold leading-none">
                      {filmPair?.filmOne?.name}
                    </h5>}
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" text-white p-2 items-center hover:bg-white/20"
            >
              <h3 className="text-2xl items-center truncate font-bold">⬅️ VS ➡️</h3>
              {!filmPair &&  <img src="/puff.svg" className="w-48" />}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
              <div onClick={() => voteRating(filmPair?.filmTwo?.id as number)} className="bg-white/10 rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                <figure className="mb-2">
                  {filmPair && <Image src={filmPair?.filmTwo?.img} alt="imgsec" width={166} height={166} className=" ml-auto mr-auto" />}
                </figure>
                <div className="rounded-lg p-4 bg-purple-600 flex flex-col">
                  <div>
                    {filmPair && <h5 className="text-white text-2xl font-bold leading-none">
                      {filmPair?.filmTwo?.name}
                    </h5>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center w-2/3 h-8 bg-purple-300 mt-5 rounded-md text-xl text-center pb-2">
            <Link href="/result">
              <h1 className="text-white text-2xl font-bold leading-none">Results</h1>
            </Link>
            <span className="p-4 text-4xl">{"-"}</span>
            <Link href="https://github.com/amsamuels/PreferedMovie">
              <h1 className="pt-2"> <img src="GitHub_Logo.png" className="w-20 leading-none " /></h1>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};


export default Home;

