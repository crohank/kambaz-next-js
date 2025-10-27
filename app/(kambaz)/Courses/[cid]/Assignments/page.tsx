/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsFileText, BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../../Database";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const cid = segments[2];
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const reduxAssignments = useSelector((state: any) => state.assignmentsReducer?.assignments || []);
  const deletedIds = useSelector((state: any) => state.assignmentsReducer?.deletedIds || []);

  const dbAssignments = db.assignments
    .filter((a) => a.course === cid)
    .filter((a) => !deletedIds.includes(a._id));

  const combined = [
    ...dbAssignments,
    ...reduxAssignments.filter((a: any) => a.course === cid),
  ];
  const uniqueAssignments = Array.from(
    new Map(combined.map((a: any) => [a._id, a])).values()
  );

  const handleDelete = (assignmentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls showFacultyButtons={currentUser?.role === "FACULTY"} />
      <ListGroup className="rounded-0 mt-4">
        <ListGroupItem className="p-0 mb-5 fs-5 border-secondary">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2" />
            <strong>ASSIGNMENTS</strong>
            <span className="ms-auto">
              <span className="border border-dark rounded-pill px-2 py-1 me-2">
                40% of Total
              </span>
            </span>
            {currentUser?.role === "FACULTY" && (
              <>
                <FaPlus className="me-2" />
                <FaEllipsisV />
              </>
            )}
          </div>

          {uniqueAssignments.map((assignment: any) => (
            <ListGroup className="rounded-0" key={assignment._id}>
              <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <BsFileText className="text-success me-3 fs-4" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-dark fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <div>
                    <span className="fw-bold text-danger">{assignment.modules}</span>
                    <span className="fw-bold"> | Not available until </span>
                    {assignment.releaseDate}
                  </div>
                  <div>
                    <span className="fw-bold">Due</span> {assignment.dueDate} |{" "}
                    {assignment.points} pts
                  </div>
                </div>
                {currentUser?.role === "FACULTY" && (
                  <AssignmentControlButtons onDelete={() => handleDelete(assignment._id)} />
                )}
              </ListGroupItem>
            </ListGroup>
          ))}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
