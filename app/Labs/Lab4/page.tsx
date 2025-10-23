"use client"
import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";

export default function lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div>
      <h1>Lab 4 : Maintaining State in React Applications</h1>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject/>
    </div>
  );
}
