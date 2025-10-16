"use client";

import Link from "next/link";
import "../../styles.css";
import { usePathname } from "next/navigation";
export default function CourseNavigation() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const courseId = segments[2];
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 me-3">
      {links.map((link) => {
        const isActive =
          pathname.includes(`/${courseId}/${link}`);  
 const linkPath =
          link === "People"
            ? `/Courses/${courseId}/${link}/Table`
            : `/Courses/${courseId}/${link}`;

        return (
          <Link
            key={link}
            href={linkPath}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
      isActive ? "border-start border-dark border-4 text-dark" : "text-danger"
    }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
