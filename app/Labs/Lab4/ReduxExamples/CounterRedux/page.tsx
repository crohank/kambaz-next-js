"use client";
import {Provider, useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "./counterReducer";
import store from "../../store/store";

export default function CounterRedux() {
    return (
        <Provider store={store}>
            <CounterReduxInner/>
        </Provider>
    );
}

function CounterReduxInner() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = useSelector((s: any) => s.counterReducer?.count ?? 0);
    const dispatch = useDispatch();

    return (
        <div id="wd-counter-redux">
            <h2>Counter Redux</h2>
            <h3>{count}</h3>
            <button
                onClick={() => dispatch(increment())}
                id="wd-counter-redux-increment-click"
            >
                Increment
            </button>
            <button
                onClick={() => dispatch(decrement())}
                id="wd-counter-redux-decrement-click"
            >
                Decrement
            </button>
            <hr/>
        </div>
    );
}
