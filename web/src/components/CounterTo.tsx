// todo: 我tm直接开摆
import { useState } from 'react'

export const CounterTo = (
    { count, duration = .3, delay = 0 }:
        { count: number, duration: number, delay: number }
) => {

    return <div>
        { count }
    </div>
}
