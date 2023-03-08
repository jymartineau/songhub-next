import { Split } from '@/types'
import React, { useMemo } from 'react'
const TOTAL = 100

interface SplitCalculator {
    setSplits: () => void
    splits: Array<Split>
}

// { writerName:"",
//         writerEmail:"",
//         writerAffiliation:"",
//         writerType:[],
//         publisher:"",
//         publisherAffiliation:"",
//         territory:"",
//         share:"",}

function SplitsCalculator({ setSplits, splits }: SplitCalculator) {

    const remainder = useMemo(() => {
        const totalSplits = splits.reduce( (accumulator, c):number => accumulator + c.percent, 0)
        return TOTAL - totalSplits
    }, [splits])


    return (
        <div>
            <div><p>Remaining: {remainder}</p></div>

        </div>
    )
}

export default SplitsCalculator