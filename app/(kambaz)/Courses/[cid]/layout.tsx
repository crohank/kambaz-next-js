"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import BreadcrumbClient from "./BreadcrumbClient";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function CoursesLayout({ children }: Props) {
  const { cid } = useParams() as { cid: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const course = courses?.find((course: any) => course._id === cid);

  // 👉 Track sidebar visibility
  const [showNav, setShowNav] = useState(true);

  const toggleNav = () => setShowNav((prev) => !prev);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        {/* Clickable sandwich icon */}
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={toggleNav}
          title={showNav ? "Hide navigation" : "Show navigation"}
        />
        {course ? course.name : "Course Not Found"}
        <BreadcrumbClient />
      </h2>
      <hr />

      <div className="d-flex">
        {/* Conditionally show/hide navigation */}
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
