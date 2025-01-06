import jwt from 'jsonwebtoken'

const privateKey = ' jas'

export const generateToken = (address: string) => new Promise<string>((resolve, reject) => {
    jwt.sign(
        { address },
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: '10m',
        },
        (error, encoded) => {
            if (error) {
                return reject(error)
            }

            if (!encoded) {
                return reject(new Error('[generateToken]: encoded is nil'))
            }

            resolve(encoded)
        }
    )
})
