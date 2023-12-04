import express from 'express'
import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'


const app = express()

const PORT = Number(process.env.PORT) || 3000

//This used for create context for trpc this means we can use req and res in trpc
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
})

const start =async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`)//this is used to log the admin url 
      }
    },
  })

  //This is the middleware for trpc and is used for create context and router
  app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }))

  //This is like a middelware
  app.use((req, res) => nextHandler(req, res))
    
  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started')

    app.listen(PORT,async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      )
    })
  })
  
}

start()