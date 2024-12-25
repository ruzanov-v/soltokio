import { JsonRpcProvider, Web3Provider } from "ethers";


type ClientBlockchainOptions = {
    rpcApi: string
}

export const create = (options: ClientBlockchainOptions) => {
    const connect = async () => {
        const provider = new Web3Provider(window.ethereum)
    
        // MetaMask требует запрашивать разрешение на подключение учетных записей пользователей
        await provider.send("eth_requestAccounts", []);
       
        // Плагин MetaMask также позволяет подписывать транзакции для
        // отправки эфира и оплаты для изменения состояния в блокчейне.
        // Для этого вам нужен подписант учетной записи...
        const signer = provider.getSigner()

        return {
            provider,
            signer,
        }
    }

    return {
        connect,
    }
}