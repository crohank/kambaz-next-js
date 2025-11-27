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
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import {
  setAssignments,
  deleteAssignment as deleteAssignmentAction,
  addAssignment,
} from "./reducer";

export default function Assignments() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const cid = segments[2];
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const [loading, setLoading] = useState(true);

  const loadAssignments = useCallback(async () => {
    try {
      const data = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));
    } finally {
      setLoading(false);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const handleDelete = async (assignmentId: string) => {
    if (!window.confirm("Delete this assignment?")) return;
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignmentAction(assignmentId));
  };

  const handleCreate = async () => {
    const title = window.prompt("Enter assignment title");
    if (!title) return;
    const newAssignment = await client.createAssignmentForCourse(cid, {
      title,
      description: "",
      points: 0,
      releaseDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      course: cid,
    });
    dispatch(addAssignment(newAssignment));
    router.push(`/Courses/${cid}/Assignments/${newAssignment._id}`);
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  if (loading) return <div>Loading assignments...</div>;

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
                <FaPlus className="me-2" onClick={handleCreate} />
                <FaEllipsis />
              </>
            )}
          </div>

          {assignments.length === 0 && (
            <div className="p-3 text-muted">No assignments found.</div>
          )}

          {assignments
            .filter((a: any) => a.course === cid)
            .map((assignment: any) => (
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
                      <span className="fw-bold">Due</span>{" "}
                      {formatDate(assignment.dueDate)} | {assignment.points} pts
                    </div>
                  </div>
                  {currentUser?.role === "FACULTY" && (
                    <AssignmentControlButtons
                      onDelete={() => handleDelete(assignment._id)}
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
