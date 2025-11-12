import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleData, setModuleData] = useState({
    id: "M101",
    name: "React Module",
    description: "Learning React Basics",
    course: "CS5610 Web Dev",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>

      <h4>Modifying Assignment Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />

      <h4>Retrieving Assignment Object</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Assignment Title</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />

      <h3 id="wd-working-with-modules">Working With Modules</h3>

      <h4>Retrieve Module Object</h4>
      <a
        id="wd-get-module"
        className="btn btn-success"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieve Module Name</h4>
      <a
        id="wd-get-module-name"
        className="btn btn-success"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Edit Module Name</h4>
      <FormControl
        className="w-75"
        id="wd-module-name"
        defaultValue={moduleData.name}
        onChange={(e) =>
          setModuleData({ ...moduleData, name: e.target.value })
        }
      />
      <a
        id="wd-update-module-name"
        className="btn btn-warning mt-2"
        href={`${MODULE_API_URL}/name/${moduleData.name}`}
      >
        Update Module Name
      </a>
      <hr />

      <h4>Edit Module Description</h4>
      <FormControl
        className="w-75"
        id="wd-module-description"
        defaultValue={moduleData.description}
        onChange={(e) =>
          setModuleData({ ...moduleData, description: e.target.value })
        }
      />
      <a
        id="wd-update-module-description"
        className="btn btn-warning mt-2"
        href={`${MODULE_API_URL}/description/${moduleData.description}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
