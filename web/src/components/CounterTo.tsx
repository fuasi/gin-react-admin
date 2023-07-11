import Styles from './Counter.module.scss'
import { useEffect, useState } from 'react';
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

export function CounterTo<T extends number>({ value, duration = .3, delay = 0, initValue }: CounterToPropsType<T>) {
    const [ val, setVal ] = useState(initValue)

    const counterStyle = {
        transition: `--counterValue ${ duration }ms ${ delay }ms`,
        '--counterValue': val
    }
    useEffect(() => setVal(value), [])

    return <div>
        <span style={ counterStyle } className={ `${ Styles.counter } text-4xl` }/>
    </div>
}
