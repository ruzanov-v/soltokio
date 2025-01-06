import { BMath } from "./BMath"

export class FixedNumber {
    readonly #width: number
    readonly #decimals: number
    readonly #raw: bigint

    constructor(raw: bigint, decimals = 18, width = 128) {
        this.#raw = raw
        this.#decimals = decimals
        this.#width = width
    }

    get width(): number {
        return this.#width
    }

    get decimals(): number {
        return this.#decimals
    }

    get raw(): bigint {
        return this.#raw
    }

    eq(x: FixedNumber): boolean {
        if (x.decimals !== this.#decimals) {
            throw new Error('[FixedNumber]: Это мы еще не написали))')
        }

        return this.#raw === x.raw
    }

    gte(x: FixedNumber): boolean {
        if (x.decimals !== this.#decimals) {
            throw new Error('[FixedNumber]: Это мы еще не написали))')
        }

        return this.#raw >= x.raw
    }

    gt(x: FixedNumber): boolean {
        if (x.decimals !== this.#decimals) {
            throw new Error('[FixedNumber]: Это мы еще не написали))')
        }

        return this.#raw > x.raw
    }

    /**
     * Returns a new FixedNumber whose value is the value of this FixedNumber plus x,
     * rounded to this FixedNumber precision significant digits.
     * @param {FixedNumber} x 
     * @returns {FixedNumber}
     */
    add(x: FixedNumber): FixedNumber {
        if (x.decimals !== this.#decimals) {
            throw new Error('[FixedNumber]: Это мы еще не написали))')
        }

        return FixedNumber.fromRawValue(this.#raw + x.raw, this.#decimals, this.#width)
    }

    subtract(x: FixedNumber):FixedNumber {
        if (x.decimals !== this.#decimals) {
            throw new Error('[FixedNumber]: Это мы еще не написали))')
        }

        return FixedNumber.fromRawValue(this.#raw - x.raw, this.#decimals, this.#width)
    }

    /**
     * Returns a new FixedNumber whose value is the value of this FixedNumber times x,
     * rounded to this FixedNumber precision significant digits.
     * @param {FixedNumber} x 
     * @returns {FixedNumber}
     */
    mul(x: FixedNumber): FixedNumber {
        const newRawValue = (this.#raw * x.raw) / BMath.exp10(BigInt(x.decimals))

        return FixedNumber.fromRawValue(newRawValue, this.#decimals, this.#width)
    }

    /**
     * Returns a raw representation of a FixedNumber.
     * @returns {bigint}
     */
    toRaw(): bigint {
        return this.#raw
    }

    /**
     * Returns a string representation of a FixedNumber.
     * @returns {string}
     */
    toSafeString(): `fixed${number}x${number}:${string}` {
        return `fixed${this.#width}x${this.#decimals}:${BMath.toHex(this.#raw)}`
    }

    toString(): string {
        // TODO не работает с отрицательными числами!!!!

        const str = this.#raw.toString(10)

        if (str === '0') {
            return '0'
        }

        if (this.#decimals === 0) {
            return str
        }
 
        if (str.length <= this.#decimals) {
            return `0.${str.padStart(this.#decimals, '0')}`
        }

        return `${str.slice(0, -this.#decimals)}.${str.slice(-this.#decimals)}`
    }

    static fromSafeString(value: string): FixedNumber {
        const regExpExecArray = /^fixed(\d+)x(\d+):(\-?0x[0-9a-f]+)$/.exec(value.trim())

        if (!regExpExecArray) {
            throw new Error()
        }

        const [_, width, decimals, rawHex] = regExpExecArray

        return FixedNumber.fromRawValue(BigInt(rawHex), Number(decimals), Number(width))
    }

    static fromNumber(value: number, decimals: number, width: number): FixedNumber {
        const str = value.toString(10)

        return FixedNumber.fromString(str,  decimals, width)
    }

    static fromString(value: string, decimals: number, width: number): FixedNumber {
        const [int, frac = ''] = value.split('.')
        const rawValue = BigInt(`${int}${frac.slice(0, decimals).padEnd(decimals, '0')}`)

        return FixedNumber.fromRawValue(rawValue, decimals, width)
    }

    static fromRawValue(value: bigint, decimals: number, width: number): FixedNumber {
        return new FixedNumber(value, decimals, width)
    }
}

export const ZERO = FixedNumber.fromRawValue(0n, 18, 128)
