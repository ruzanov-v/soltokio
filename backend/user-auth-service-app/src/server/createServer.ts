import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';

export const createServer = () => {
    const app = createHTTPServer({
        router: appRouter,
    })

    const listen = (port: number) => {
        app.server.once('listening', () => {
            console.log(`Example app listening on port ${port}`)
        })

        app.listen(port)
    }

    return {
        listen,
        server: app.server,
    }
}
