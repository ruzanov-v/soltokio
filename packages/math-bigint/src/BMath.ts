export class BMath {
    /**
     * Returns 10n raised to a power.
     * @param n A numeric expression representing the power of 10n.
     */
    static exp10(n: bigint): bigint {
        return 10n ** n
    }

    /**
     * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
     * For example, the absolute value of -5n is the same as the absolute value of 5n.
     * @param x Bigint for which the absolute value is needed.
     */
    static abs(v: bigint) {
        return v > 0n ? v : -v
    }

    /**
     * Returns a hex string representation of a value.
     * @param value Bigint for which the hex string is needed.
     */
    static toHex(value: bigint): string {
        return `${value < 0n ? '-' : ''}0x${BMath.abs(value).toString(16)}`
    }
}
