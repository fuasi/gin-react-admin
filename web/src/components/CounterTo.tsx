// todo: 我tm直接开摆
import { ReactComponentElement } from 'react'
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
    children: (count: T) => ReactComponentElement<any>,
    initValue: T
}
export const CounterTo = ({ value, duration = .3, delay = 0, children, initValue }: CounterToPropsType) => {

    if (children) {
        return children(value)
    }

    return <div>
        { value }
    </div>
}
