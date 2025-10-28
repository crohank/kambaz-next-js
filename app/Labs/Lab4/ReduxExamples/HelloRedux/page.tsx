"use client";
import {Provider, useSelector} from "react-redux";
import store from "../../store/store";

export default function HelloRedux() {
    return (
        <Provider store={store}>
            <HelloReduxInner/>
        </Provider>
    );
}

function HelloReduxInner() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = useSelector((state: any) => state.helloReducer?.message ?? "");

    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <hr/>
        </div>
    );
}
