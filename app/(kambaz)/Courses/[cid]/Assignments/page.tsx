import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentControls from "./AssignmentControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsFileText, BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import {FaPlus } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import AssignmentControlButtons from "./AssignmentControlButtons";

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

                <ListGroup className="rounded-0">
                  <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BsFileText className="text-success me-3 fs-4"/>
                    <div className="flex-grow-1">
                      <Link href="/Courses/1234/Assignments/123" className="text-dark fw-bold">
                      A1
                      </Link>
                      <div>
                        <span className="fw-bold text-danger">Multiple Modules</span><span className="fw-bold">| Not available until</span> Sep 20 at 12:00am|
                      </div>
                      <div>
                        <span className="fw-bold">Due</span> Sep 30 at 11:59 | 200 pts
                      </div>
                    </div>
                    <AssignmentControlButtons/>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="rounded-0">
                  <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BsFileText className="text-success me-3 fs-4"/>
                    <div className="flex-grow-1">
                      <Link href="/Courses/1234/Assignments/123" className="text-dark fw-bold">
                      A2
                      </Link>
                      <div>
                        <span className="fw-bold text-danger">Multiple Modules</span><span className="fw-bold">| Not available until</span> Oct 10 at 12:00am|
                      </div>
                      <div>
                        <span className="fw-bold">Due</span> Oct 18 at 11:59 | 150 pts
                      </div>
                    </div>
                    <AssignmentControlButtons/>
                  </ListGroupItem>
                </ListGroup>


                <ListGroup className="rounded-0">
                  <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BsFileText className="text-success me-3 fs-4"/>
                    <div className="flex-grow-1">
                      <Link href="/Courses/1234/Assignments/123" className="text-dark fw-bold">
                      A3
                      </Link>
                      <div>
                        <span className="fw-bold text-danger">Multiple Modules</span><span className="fw-bold">| Not available until</span> Oct 20 at 12:00am|
                      </div>
                      <div>
                        <span className="fw-bold">Due</span> Oct 28 at 11:59 | 100 pts
                      </div>
                    </div>
                    <AssignmentControlButtons/>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="rounded-0">
                  <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BsFileText className="text-success me-3 fs-4"/>
                    <div className="flex-grow-1">
                      <Link href="/Courses/1234/Assignments/123" className="text-dark fw-bold">
                      A4
                      </Link>
                      <div>
                        <span className="fw-bold text-danger">Multiple Modules</span><span className="fw-bold">| Not available until</span> Oct 30 at 12:00am|
                      </div>
                      <div>
                        <span className="fw-bold">Due</span> Nov 08 at 11:59 | 100 pts
                      </div>
                    </div>
                    <AssignmentControlButtons/>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="rounded-0">
                  <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BsFileText className="text-success me-3 fs-4"/>
                    <div className="flex-grow-1">
                      <Link href="/Courses/1234/Assignments/123" className="text-dark fw-bold">
                      A5
                      </Link>
                      <div>
                        <span className="fw-bold text-danger">Multiple Modules</span><span className="fw-bold">| Not available until</span> Nov 10 at 12:00am|
                      </div>
                      <div>
                        <span className="fw-bold">Due</span> Nov 18 at 11:59 | 100 pts
                      </div>
                    </div>
                    <AssignmentControlButtons/>
                  </ListGroupItem>
                </ListGroup>

              </ListGroupItem>
            </ListGroup>
    </div>
  );
}