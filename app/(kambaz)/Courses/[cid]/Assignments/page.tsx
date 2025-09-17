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
          <a href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </a>
          <p>
            -Set up the Kambaz project. <br/>
            -Implement the basic components of the kambaz application.
            </p> </li>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/124"
             className="wd-assignment-link" >
            A2 - CSS
          </a> 
          <p>
            -Adding styling to the kambaz application using CSS <br/>
            -Update the 
            </p>
        </li>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/125"
             className="wd-assignment-link" >
            A3 - API
          </a> 
          <p>
            -Implement a backend database <br/>
            -sfgsfg
            </p>
        </li>
        <li className="wd-assignment-list-item">
          <a href="/Courses/1234/Assignments/126"
             className="wd-assignment-link" >
            A4 - DataBase
          </a>
          <p>
            -Implement a backend database <br/>
            -sfgsfg
            </p>
        </li>
      </ul>
    </div>
);}

