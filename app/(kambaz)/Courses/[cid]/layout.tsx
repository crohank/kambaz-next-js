import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import BreadcrumbClient from "./BreadcrumbClient";
import { courses } from "../../Database";

type Props = {
  children: ReactNode;
  params: Promise<{ cid: string }>; 
};


export default async function CoursesLayout({ children, params }: Props) {
  const { cid } = await params; 
  const course = courses.find((course) => course._id === cid);
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name}
        <BreadcrumbClient />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}