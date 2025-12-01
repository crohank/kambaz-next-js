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
  number?: string;
  startDate?: string;
  endDate?: string;
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
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    image: "/images/Mac.jpg",
    description: "New Description",
  });

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    let data = [];

    try {
      data =
        currentUser.role === "FACULTY"
          ? await client.findMyCourses()
          : await client.fetchAllCourses();
    } catch (e) {
      data = await client.fetchAllCourses();
    }

    if (currentUser.role === "FACULTY" && data.length === 0) {
      data = await client.fetchAllCourses();
    }
    setCourses(data);
  }, [currentUser]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    const data = await client.findEnrollmentsForUser(currentUser._id);
    setEnrollments(data);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser, fetchCourses, fetchEnrollments]);

  const onAddNewCourse = async () => {
    if (!currentUser) return;
    const newCourse = await client.createCourse({
      ...course,
      createdBy: currentUser._id,
    });
    setCourses([...courses, newCourse]);
  };

  const onUpdateCourse = async () => {
    const updatedCourse = await client.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.enrollUserInCourse(currentUser._id, courseId);
    await fetchEnrollments();
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.unenrollUserFromCourse(currentUser._id, courseId);
    await fetchEnrollments();
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
      ? courses
      : showAll
      ? courses
      : courses.filter((c) => enrollments.some((e) => e.course === c._id));

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
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={c.image || "/images/MERN.jpg"}
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
