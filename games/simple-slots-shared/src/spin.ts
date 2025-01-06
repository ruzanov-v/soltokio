import z from 'zod'

export const ClientSpinEventConstraint = z.object({
    bid: z.object({
        amount: z.number(),
        currency: z.string(),
    })
})

export type ClientSpinEvent = z.infer<typeof ClientSpinEventConstraint>