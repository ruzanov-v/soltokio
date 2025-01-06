import { getUserByToken } from './getUserByToken'
import { consumer } from './consumer'
import {UserAuthEventsConstraint} from '@suka-back/user-auth-service-interfaces/src/entrypoint'
import { createServer } from './server/createServer'
export type {AppRouter} from './server/router'

consumer.consume((msg) => {
    const data = UserAuthEventsConstraint.parse(JSON.parse(msg.content.toString()))
    const user = getUserByToken(data.token)

    consumer.replay(msg, true, user)
})


const server = createServer()

const PORT = 3002 

server.listen(PORT)
