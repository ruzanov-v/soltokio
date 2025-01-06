import {createTRPCProxyClient, httpLink} from '@trpc/client'
import {} from '@suka-back/user-auth-service-app/dist/entrypoint'

export const getClient = (url: string) => {
    const trpc = createTRPCProxyClient<AppRouter>({
        links: [
            httpLink({
                url,
            }),
        ],
    });

    return trpc
}
