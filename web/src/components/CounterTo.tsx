import Styles from './Counter.module.scss'
import { useEffect, useState } from "react";
/*
    <CounterTo count={30}>
        {
            (count)=>{
                return <div>{count}</div>
            }
        }
    </CounterTo>
 */

type CounterToPropsType<T = number> = {
    value: T,
    duration: number,
    delay: number,
    initValue: T
}

export const CounterTo = ({ value, duration = .3, delay = 0, initValue }: CounterToPropsType) => {
    const [counterRun, setCounterRun] = useState<boolean>(false)

    const initCounterStyle = {
        transition : `--counterValue ${duration}ms ${delay}ms`,
        '--counterValue' : initValue
    }

    const counterStyle = {
        transition : `--counterValue ${duration}ms ${delay}ms`,
        '--counterValue' : value
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setCounterRun(true)
        }, 0)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return <div>
        <span style={counterRun ? counterStyle : initCounterStyle} className={`${Styles.counter} text-4xl`}></span>
    </div>
}
