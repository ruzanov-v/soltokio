import { FixedNumber } from "@sukacripta/math-bigint";

type GameResultOptions = {
    reelsCount: number,
    variantsCount: number,
}

/**
 * 
 * @param targetRTP 0.95
 */
const calcPayout = (targetRTP: number, options: GameResultOptions) => {
    const totalCombinations = options.variantsCount ** options.reelsCount;
    // Define the combinations and their payouts
    const combinations = [
        { name: 'full' as const, count: options.variantsCount, payout: 4 },
        { name: 'three' as const, count: 48, payout: 2 },
        { name: 'pairs' as const, count: 36, payout: 1 },
        { name: "Others" as const, count: totalCombinations - options.variantsCount - 48 - 36, payout: 0 }
    ];
            
    // Current RTP calculation
    let currentRTP = combinations.reduce((sum, combination) => {
        const probability = combination.count / totalCombinations;
        return sum + probability * combination.payout;
    }, 0);
    
    const scalingFactor = targetRTP / currentRTP;
    
    const adjustedCombinations = combinations.map(combination => {
        const adjustedPayout = combination.payout * scalingFactor;
        const probability = combination.count / totalCombinations;
        const expectedPayout = probability * adjustedPayout;
        return {
        name: combination.name,
        count: combination.count,
        probability: probability,
        adjustedPayout: adjustedPayout,
        expectedPayout: expectedPayout
        };
    });
    
    console.log("Adjusted RTP Calculation:");
    adjustedCombinations.forEach(combination => {
        console.log({
            Combination: combination.name,
            Count: combination.count,
            Probability: combination.probability.toFixed(4),
            AdjustedPayout: combination.adjustedPayout.toFixed(2),
            ExpectedPayout: combination.expectedPayout.toFixed(4)
        });
    });
      
    const totalExpectedRTP = adjustedCombinations.reduce(
        (sum, combination) => sum + combination.expectedPayout,
        0
    );
    
    console.log("Total Expected RTP:", totalExpectedRTP.toFixed(4));

    return new Map(adjustedCombinations.map((combination) => [combination.name, combination]))
}

const adjustedCombinations = calcPayout(
    0.995,
    {
        reelsCount: 4,
        variantsCount: 4,
    },
)

export class GameResult {
    result: number[] = []
    coefficient: FixedNumber

    constructor(options: GameResultOptions) {
        for (let index = 0; index < options.reelsCount; index++) {
            this.result.push(GameResult.random(options.variantsCount))
        }

        this.coefficient = FixedNumber.fromNumber(GameResult.calcCoefficient(this.result), 18, 128)
    }

    static calcCoefficient(result: number[]) {
        if (result.every(i => i === result[0])) {
            return adjustedCombinations.get('full')!.adjustedPayout
        }

        if (
            result[0] === result[1]
            && result[1] === result[2]
        ) {
            return adjustedCombinations.get('three')!.adjustedPayout
        }

        if (
            result[1] === result[2]
            && result[2] === result[3]
        ) {
            return adjustedCombinations.get('three')!.adjustedPayout
        }

        if (
            result[0] === result[1]
            && result[2] === result[3]
        ) {
            return adjustedCombinations.get('pairs')!.adjustedPayout
        }

        return 0
    }

    /** От 1 до n */
    static random(n: number) {
        return Math.round(Math.random() * (n - 1)) + 1
    }
}
