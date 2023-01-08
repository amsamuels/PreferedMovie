import { z } from "zod";
import { initTRPC } from '@trpc/server';
import { prisma } from "../../db/client";
import { getData } from "../../../utils/getRandomFilm";


  
export const t = initTRPC.create();

type Movie = {
  id : string;
  title: string;
  img: string;
  }

export const movieRouter = t.router({
  // Create procedure at path 'getfilbyID'
  getfilbyID: t.procedure
    // using zod schema to validate and infer input values
    .input(
      z.object({ id: z.any()})
    )
    .query( async ({ input })  =>  {
      const movie  = await getData(input.id)
      return {
        movie: movie as Movie,
      }
    }), voteCast: t.procedure.input(z.object({
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

