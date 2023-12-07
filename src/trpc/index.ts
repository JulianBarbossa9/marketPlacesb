import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

//This is the router that will be used by the server, that means that it will be used by the client too
export const appRouter = router({
    auth: authRouter,
})


export type AppRouter = typeof appRouter