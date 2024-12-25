import { GameWsApiStateResultRaw } from "@suka-game/simple-slots-shared/src/types";

export class GameResult {
    result: GameWsApiStateResultRaw
    coefficient = 0

    constructor() {
        this.result = [
            GameResult.random(),
            GameResult.random(),
            GameResult.random(),
            GameResult.random(),
        ]

        this.coefficient = GameResult.calcCoefficient(this.result)
    }

    static calcCoefficient(result: GameWsApiStateResultRaw) {
        if (
            result[0] === result[2]
            && result[1] === result[3]
        ) {
            return result[0]
        }

        if (
            result[0] === result[3]
            && result[1] === result[2]
        ) {
            return result[1]
        }

        if (
            result[0] === result[1]
            || result[1] === result[2]
            || result[2] === result[3]
        ) {
            return result[1]
        }

        if (
            result[0] === result[1]
            && result[0] === result[2]
            && result[0] === result[3]
        ) {
            return (result[0] + 1) * 10
        }

        return 0
    }

    /** От 1 до n */
    static random() {
        return Math.round(Math.random() * 5) + 1
    }
}
