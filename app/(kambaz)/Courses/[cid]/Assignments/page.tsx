/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsFileText, BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus, FaEllipsis } from "react-icons/fa6";
import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setAssignments, deleteAssignment } from "./reducer";

export default function Assignments() {
  const pathname = usePathname();
  const cid = pathname.split("/")[2];
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));
      setLoading(false);
    };
    load();
  }, [cid, dispatch]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this assignment?")) return;
    await client.deleteAssignment(id);
    dispatch(deleteAssignment(id));
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
                {assignments.length} Total
              </span>
            </span>

            {currentUser?.role === "FACULTY" && (
              <>
                <FaPlus className="me-2" />
                <FaEllipsis />
              </>
            )}
          </div>

          {assignments.length === 0 && (
            <div className="p-3 text-muted">No assignments found.</div>
          )}

          {assignments.map((a: any) => (
            <ListGroup className="rounded-0" key={a._id}>
              <ListGroupItem className="p-3 ps-1 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <BsFileText className="text-success me-3 fs-4" />

                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="text-dark fw-bold"
                  >
                    {a.title}
                  </Link>

                  <div>
                    <span className="fw-bold">Due</span>{" "}
                    {new Date(a.dueDate).toLocaleString()} | {a.points} pts
                  </div>
                </div>

                {currentUser?.role === "FACULTY" && (
                  <AssignmentControlButtons
                    onDelete={() => handleDelete(a._id)}
                  />
                )}
              </ListGroupItem>
            </ListGroup>
          ))}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
