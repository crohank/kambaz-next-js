/* eslint-disable @typescript-eslint/no-unused-expressions */
// "use client";
// import * as client from "../Courses/client";
// import { ChangeEvent, useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardImg,
//   CardText,
//   CardTitle,
//   Col,
//   FormControl,
//   Row,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { enrollUser, unenrollUser } from "./reducer";
// import { useRouter } from "next/navigation";

// interface Course {
//   _id: string;
//   name: string;
//   number: string;
//   startDate: string;
//   endDate: string;
//   image: string;
//   description: string;
//   createdBy?: string;
// }

// interface RootState {
//   accountReducer: {
//     currentUser: { _id: string; role: string } | null;
//   };
//   enrollmentsReducer: {
//     enrollments: { user: string; course: string }[];
//   };
// }

// export default function Dashboard() {
//   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
//   const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [showAll, setShowAll] = useState(false);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [course, setCourse] = useState<Course>({
//     _id: "0",
//     name: "New Course",
//     number: "New Number",
//     startDate: "2023-09-10",
//     endDate: "2023-12-15",
//     image: "/images/Mac.jpg",
//     description: "New Description",
//   });

//   /** Fetch courses based on user role */
//   const fetchCourses = useCallback(async () => {
//     try {
//       if (!currentUser) return;

//       // Faculty only see their own or created courses; Students see all
//       const data =
//         currentUser.role === "FACULTY"
//           ? await client.findMyCourses()
//           : await client.fetchAllCourses();

//       setCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   }, [currentUser]);

//   /** Run on mount or when currentUser changes */
//   useEffect(() => {
//     if (currentUser) fetchCourses();
//   }, [currentUser, fetchCourses]);

//   /** Add a new course */
//   const onAddNewCourse = async () => {
//     try {
//       const newCourse = await client.createCourse({
//         ...course,
//         createdBy: currentUser?._id,
//       });
//       setCourses([...courses, newCourse]);
//     } catch (error) {
//       console.error("Error adding course:", error);
//     }
//   };

//   /** Update existing course */
//   const onUpdateCourse = async () => {
//     try {
//       const updatedCourse = await client.updateCourse(course);
//       setCourses(
//         courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
//       );
//     } catch (error) {
//       console.error("Error updating course:", error);
//     }
//   };

//   /** Delete course */
//   const onDeleteCourse = async (courseId: string) => {
//     try {
//       await client.deleteCourse(courseId);
//       setCourses(courses.filter((c) => c._id !== courseId));
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     }
//   };

//   // Redirect to sign-in if not logged in
//   if (!currentUser) {
//     return (
//       <div className="text-center mt-5">
//         <h2>You must be signed in to view your dashboard.</h2>
//         <Button
//           variant="primary"
//           size="lg"
//           className="mt-3"
//           onClick={() => router.push("/Account/Signin")}
//         >
//           Sign In
//         </Button>
//       </div>
//     );
//   }

//   /** Filter courses to display based on user and toggle state */
//   const filteredCourses =
//     currentUser.role === "FACULTY"
//       ? courses.filter((c) => {
//           const isCreatedBy = c.createdBy === currentUser._id;
//           const isEnrolledIn = enrollments.some(
//             (e) => e.user === currentUser._id && e.course === c._id
//           );
//           return isCreatedBy || isEnrolledIn;
//         })
//       : showAll
//       ? courses // Show all courses when "Enrollments" button is active
//       : courses.filter((c) =>
//           enrollments.some(
//             (e) => e.user === currentUser._id && e.course === c._id
//           )
//         );

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
//         Dashboard
//         {currentUser.role === "STUDENT" && (
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowAll(!showAll)}
//           >
//             {showAll ? "My Courses" : "Enrollments"}
//           </button>
//         )}
//       </h1>
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({filteredCourses.length})
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses">
//         {currentUser.role === "FACULTY" && (
//           <>
//             <h5>
//               New Course
//               <button
//                 className="btn btn-primary float-end me-2"
//                 id="wd-add-new-course-click"
//                 onClick={onAddNewCourse}
//               >
//                 Add
//               </button>
//               <button
//                 className="btn btn-warning float-end me-2"
//                 onClick={onUpdateCourse}
//                 id="wd-update-course-click"
//               >
//                 Update
//               </button>
//             </h5>
//             <br />
//             <FormControl
//               id="name"
//               value={course.name}
//               className="mb-2"
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setCourse({ ...course, name: e.target.value })
//               }
//             />
//             <FormControl
//               as="textarea"
//               id="description"
//               value={course.description}
//               rows={3}
//               onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                 setCourse({ ...course, description: e.target.value })
//               }
//             />
//             <hr />
//           </>
//         )}

//         <Row xs={1} md={5} className="g-4">
//           {filteredCourses.map((c) => {
//             const isEnrolled = enrollments.some(
//               (e) => e.user === currentUser._id && e.course === c._id
//             );

//             return (
//               <Col
//                 key={c._id}
//                 className="wd-dashboard-course"
//                 style={{ width: "300px" }}
//               >
//                 <Card>
//                   <Link
//                     href={`/Courses/${c._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     <CardImg
//                       src={c.image || "/images/react.jpg"}
//                       variant="top"
//                       width="100%"
//                       height={160}
//                     />
//                     <CardBody className="card-body">
//                       <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {c.name}
//                       </CardTitle>
//                       <CardText
//                         className="wd-dashboard-course-description overflow-hidden"
//                         style={{ height: "100px" }}
//                       >
//                         {c.description}
//                       </CardText>

//                       {(isEnrolled || currentUser.role === "FACULTY") && (
//                         <Button variant="primary">Go</Button>
//                       )}

//                       {currentUser.role === "FACULTY" && (
//                         <>
//                           <button
//                             id="wd-edit-course-click"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setCourse(c);
//                             }}
//                             className="btn btn-warning me-2 float-end"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               onDeleteCourse(c._id);
//                             }}
//                             className="btn btn-danger float-end me-2"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}

//                       {currentUser.role !== "FACULTY" && showAll && (
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (isEnrolled) {
//                               dispatch(
//                                 unenrollUser({
//                                   user: currentUser._id,
//                                   course: c._id,
//                                 })
//                               );
//                             } else {
//                               dispatch(
//                                 enrollUser({
//                                   user: currentUser._id,
//                                   course: c._id,
//                                 })
//                               );
//                             }
//                           }}
//                           className={`btn float-end ${
//                             isEnrolled ? "btn-danger" : "btn-success"
//                           } me-2`}
//                         >
//                           {isEnrolled ? "Unenroll" : "Enroll"}
//                         </button>
//                       )}
//                     </CardBody>
//                   </Link>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </div>
//     </div>
//   );
// }
"use client";
import * as client from "../Courses/client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
  createdBy?: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface RootState {
  accountReducer: {
    currentUser: { _id: string; role: string } | null;
  };
}

export default function Dashboard() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/Mac.jpg",
    description: "New Description",
  });

  /** Fetch all courses for the dashboard */
  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data =
        currentUser.role === "FACULTY"
          ? await client.findMyCourses()
          : await client.fetchAllCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, [currentUser]);

  /** Fetch all enrollments for the current user */
  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data = await client.findEnrollmentsForUser(currentUser._id);
      setEnrollments(data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser, fetchCourses, fetchEnrollments]);

  /** Add a new course */
  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse({
        ...course,
        createdBy: currentUser?._id,
      });
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  /** Update a course */
  const onUpdateCourse = async () => {
    try {
      const updatedCourse = await client.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  /** Delete a course */
  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  
  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollUserInCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  
  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollUserFromCourse(currentUser._id, courseId);
      await fetchEnrollments(); 
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h2>You must be signed in to view your dashboard.</h2>
        <Button
          variant="primary"
          size="lg"
          className="mt-3"
          onClick={() => router.push("/Account/Signin")}
        >
          Sign In
        </Button>
      </div>
    );
  }

  
  const filteredCourses =
    currentUser.role === "FACULTY"
      ? courses.filter(
          (c) =>
            c.createdBy === currentUser._id ||
            enrollments.some((e) => e.course === c._id)
        )
      : showAll
      ? courses
      : courses.filter((c) =>
          enrollments.some((e) => e.course === c._id)
        );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "My Courses" : "Enrollments"}
          </button>
        )}
      </h1>
      <hr />
      <h2>Published Courses ({filteredCourses.length})</h2>
      <hr />

      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            id="name"
            value={course.name}
            className="mb-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCourse({ ...course, name: e.target.value })
            }
          />
          <FormControl
            as="textarea"
            id="description"
            value={course.description}
            rows={3}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <Row xs={1} md={5} className="g-4">
        {filteredCourses.map((c) => {
          const isEnrolled = enrollments.some((e) => e.course === c._id);

          return (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={c.image || "/images/react.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>

                    {(isEnrolled || currentUser.role === "FACULTY") && (
                      <Button variant="primary">Go</Button>
                    )}

                    {currentUser.role === "FACULTY" && (
                      <>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                          className="btn btn-danger float-end me-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {currentUser.role !== "FACULTY" && showAll && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          isEnrolled ? onUnenroll(c._id) : onEnroll(c._id);
                        }}
                        className={`btn float-end ${
                          isEnrolled ? "btn-danger" : "btn-success"
                        } me-2`}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
