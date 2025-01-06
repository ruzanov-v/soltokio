import {getClient} from '@sukacripta/user-auth-service-client/src/entrypoint'

export const useAuth = async () => {
    const client = getClient('/auth')

    const payload = await client.eth.init.mutate({address: '23456789'})

    const token = await client.eth.sign.mutate({message: payload, signature: 'iojhbn'})
}
