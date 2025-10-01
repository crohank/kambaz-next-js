import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentControls from "./AssignmentControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls />

      <ListGroup className="rounded-0 mt-4">
              <ListGroupItem className="p-0 mb-5 fs-5 border-secondary">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <IoMdArrowDropdown className="me-2"/>
                  <strong>ASSIGNMENTS</strong>
                  <span className="ms-auto">
                    <span className="border border-dark rounded-pill px-2 py-1 me-2">
                      40% of Total
                    </span>
                  </span>
                  <FaPlus className="me-2"/>
                  <FaEllipsisV/>
                </div>
                
                <ListGroup className="wd-lessons rounded-0">
                  <ListGroupItem className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                  <ListGroupItem className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> Introduction to the
                    course <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
    </div>
  );
}