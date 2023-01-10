import { z } from "zod";
import { initTRPC } from '@trpc/server';
import { prisma } from "../../db/client";
import { getOptionsForVote } from "../../../utils/getRandomFilm";
  
export const t = initTRPC.create();

type Film = {
  id : number,
  name: string,
  img: string,
  }

export const movieRouter = t.router({
  // Create procedure at path 'getfilbyID'
  getfilbyID: t.procedure
    // using zod schema to validate and infer input values
    .query( async ()  =>  {
      const [first, second] = getOptionsForVote();
      const twoFilms = await prisma.film.findMany({
        where: { id: { in: [first as number, second as number] } },
      });

      if (twoFilms.length !== 2)
        throw new Error("Failed to find two pokemon");
      return {
        filmOne: twoFilms[0] as Film, filmTwo: twoFilms[1] as Film,}
    }),
     voteCast: t.procedure.input(z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),).mutation( async ({ input }) => {
      const voteIndb =  await  prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      }) 
      return { success: true, vote: voteIndb };
    }),
});

