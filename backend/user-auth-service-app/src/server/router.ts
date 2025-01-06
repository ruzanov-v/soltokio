import { publicProcedure, router } from './trpc';
import {nanoid} from 'nanoid';
import z from 'zod';
import { generateToken } from '../generateToken';
import { verifyMessage } from 'ethers';

const authSessions = new Map()
 
export const appRouter = router({
    eth: router({
        init: publicProcedure
            .input(z.object({address: z.string()}))
            .mutation(async ({input}) => {
                const payload = {
                    address: input.address,
                    session: nanoid(),
                    ttl: 0,
                }
            
                authSessions.set(payload.session, payload)
            
                return payload
            }),
        sign: publicProcedure
            .input(z.object({message: z.any(), signature: z.string()}))
            .mutation(async ({input}) => {
                const authSession = authSessions.get(input.message.id)
    
                if (!authSession) {
                    new Error('invalid signature')
                }

                if (
                    authSession.address !== input.message.address
                    || authSession.ttl < Date.now()
                ) {
                    new Error('invalid signature')
                }

                if (input.message.address !== verifyMessage(input.message, input.signature)) {
                    new Error('invalid signature')
                }

                authSessions.delete(input.message.id)

                const token = generateToken(authSession.address)

                return token
            }),
    })
})
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter