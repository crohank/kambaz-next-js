"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";

interface AssignmentControlsProps {
  showFacultyButtons?: boolean;
}

export default function AssignmentControls({
  showFacultyButtons = false,
}: AssignmentControlsProps) {
  const router = useRouter();
  const { cid } = useParams();

  return (
    <div id="wd-assignement-controls" className="d-flex align-items-center">
      <div className="input-group" style={{ maxWidth: "250px" }}>
        <span className="input-group-text bd-white border-end-0">
          <CiSearch />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search.."
        />
      </div>

      {showFacultyButtons && (
        <div className="ms-auto">
          <Button variant="secondary" size="lg" className="me-2">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>

          <Button
            variant="danger"
            size="lg"
            className="me-1"
            id="wd-add-assignment-btn"
            onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </div>
      )}
    </div>
  );
}
