import { inferProcedureOutput } from "@trpc/server";
import { type } from "os";
import { router } from "../trpc";
import { movieRouter } from "./movieinfo";

export const appRouter = router({
  movie: movieRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

