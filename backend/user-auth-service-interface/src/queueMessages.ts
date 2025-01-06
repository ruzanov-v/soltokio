import z from 'zod'

export const QUEUE_NAME = 'user-auth-service'

export enum MessagesTypes {
    getUserByToken = 'getUserByToken'
}

const UserAuthEventGetUserByTokenConstraint = z.object({
    type: z.literal(MessagesTypes.getUserByToken),
    token: z.string()
})

export const UserAuthEventsConstraint = z.discriminatedUnion(
    'type',
    [
        UserAuthEventGetUserByTokenConstraint,
    ],
)

export type UserAuthEvents = z.infer<typeof UserAuthEventsConstraint>
export type UserAuthRawEvents = z.input<typeof UserAuthEventsConstraint>
