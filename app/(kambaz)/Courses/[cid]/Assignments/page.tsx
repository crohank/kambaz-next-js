import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
                className="wd-assignment-link" >
            A1 - ENV + HTML
          </Link>
          <p>
            -Set up the Kambaz project. <br/>
            -Implement the basic components of the kambaz application.
            </p> </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/124"
                className="wd-assignment-link" >
            A2 - CSS
          </Link> 
          <p>
            -Adding styling to the kambaz application using CSS <br/>
            -Update the components built in first Assignment 1
            </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/125"
                className="wd-assignment-link" >
            A3 - API
          </Link> 
          <p>
            -Implement API to pull course data
            </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/126"
                className="wd-assignment-link" >
            A4 - DataBase
          </Link>
          <p>
            -Implement a backend database <br/>
            -Update the code to connect to the database
            </p>
        </li>
      </ul>
    </div>
); }