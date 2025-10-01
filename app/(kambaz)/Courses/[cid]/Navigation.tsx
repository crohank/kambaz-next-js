"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles.css"
export default function CourseNavigation() {
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      <Link
        href="/Courses/1234/Home"
        id="wd-course-home-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Home"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Home
      </Link>
      <Link
        href="/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Modules"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Modules
      </Link>
      <Link
        href="/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Piazza"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Piazza
      </Link>
      <Link
        href="/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Zoom"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Zoom
      </Link>
      <Link
        href="/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Assignments"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Assignments
      </Link>
      <Link
        href="/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/Quizzes"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        Quizzes
      </Link>
      <Link
        href="/Courses/1234/People/Table"
        id="wd-course-people-link"
        className={`list-group-item border-0 ${
          pathname === "/Courses/1234/People/Table"
            ? "active text-danger fw-bold"
            : "text-danger"
        }`}
      >
        People
      </Link>
    </div>
  );
}
