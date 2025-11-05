import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithModule() {
  const [module, setModule] = useState({
    id: "M101",
    name: "React Module",
    description: "Learning React Basics",
    course: "CS5610 Web Dev",
  });

  const MODULE_API = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3>Working With Module Objects</h3>

      <h4>Update Module Name</h4>
      <a
        className="btn btn-primary float-end"
        id="wd-update-module-name"
        href={`${MODULE_API}/name/${module.name}`}
      >
        Update Name
      </a>
      <FormControl
        className="w-75"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <hr />

      <h4>Update Module Description</h4>
      <a
        className="btn btn-warning float-end"
        id="wd-update-module-description"
        href={`${MODULE_API}/description/${module.description}`}
      >
        Update Description
      </a>
      <FormControl
        className="w-75"
        id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <hr />

      <h4>Retrieve Module</h4>
      <a className="btn btn-success" id="wd-get-module" href={`${MODULE_API}`}>
        Get Module
      </a>
      <hr />

      <h4>Retrieve Module Name</h4>
      <a
        className="btn btn-primary"
        id="wd-get-module-name"
        href={`${MODULE_API}/name`}
      >
        Get Module Name
      </a>
      <hr />
    </div>
  );
}
