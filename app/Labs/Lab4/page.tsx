"use client"
import TodoList from "../Lab4/ReduxExamples/todos/TodoList";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import AddRedux from "./ReduxExamples/AddRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import ReduxExamples from "./ReduxExamples/page";
import StringStateVariables from "./StringStateVariables";
import store from "./store/store";
import {Provider} from "react-redux";

export default function lab4() {
    function sayHello() {
        alert("Hello");
    }

    return (
        <Provider store={store}>
            <div>
                <h1>Lab 4 : Maintaining State in React Applications</h1>
                <ClickEvent/>
                <PassingDataOnEvent/>
                <PassingFunctions theFunction={sayHello}/>
                <EventObject/>
                <Counter/>
                <BooleanStateVariables/>
                <StringStateVariables/>
                <DateStateVariable/>
                <ObjectStateVariable/>
                <ArrayStateVariable/>
                <ParentStateComponent/>
                <ReduxExamples/>
                <HelloRedux/>
                <CounterRedux/>
                <AddRedux/>
                <TodoList/>
            </div>
        </Provider>
    );
}
