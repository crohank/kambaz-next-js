"use client";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "./reducer";

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

interface RootState {
    coursesReducer: {
        courses: Course[];
    };
    accountReducer: {
        currentUser: { _id: string; role: string };
    };
    enrollmentsReducer: {
        enrollments: { user: string; course: string }[];
    };
}

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const { enrollments } = useSelector(
        (state: RootState) => state.enrollmentsReducer
    );
    const dispatch = useDispatch();

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

    const handleAddCourse = () => {
        const newCourse = { ...course, createdBy: currentUser._id };
        dispatch(addNewCourse(newCourse));
    };

    const handleUpdateCourse = () => {
        dispatch(updateCourse(course));
    };

    // const filteredCourses =
    //     currentUser.role === "FACULTY"
    //         ? courses.filter((c) => c.createdBy === currentUser._id)
    //         : showAll
    //             ? courses
    //             : courses.filter((course) =>
    //                 enrollments.some(
    //                     (enrollment) =>
    //                         enrollment.user === currentUser._id &&
    //                         enrollment.course === course._id
    //                 )
    //             );

    const filteredCourses =
        currentUser.role === "FACULTY"
            ? courses.filter((c) => {

                const isCreatedBy = c.createdBy === currentUser._id;


                const isEnrolledIn = enrollments.some(
                    (enrollment) =>
                        enrollment.user === currentUser._id &&
                        enrollment.course === c._id
                );


                return isCreatedBy || isEnrolledIn;
            })
            : showAll
                ? courses
                : courses.filter((course) =>
                    enrollments.some(
                        (enrollment) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                    )
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
            <h2 id="wd-dashboard-published">
                Published Courses ({filteredCourses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses">
                {currentUser.role === "FACULTY" && (
                    <>
                        <h5>
                            New Course
                            <button
                                className="btn btn-primary float-end me-2"
                                id="wd-add-new-course-click"
                                onClick={handleAddCourse}
                            >
                                Add
                            </button>
                            <button
                                className="btn btn-warning float-end me-2"
                                onClick={handleUpdateCourse}
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
                    {filteredCourses.map((course) => {
                        const isEnrolled = enrollments.some(
                            (enrollment) =>
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                        );

                        return (
                            <Col
                                key={course._id}
                                className="wd-dashboard-course"
                                style={{ width: "300px" }}
                            >
                                <Card>
                                    <Link
                                        href={`/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        <CardImg
                                            src={course.image || "images.react.jpg"}
                                            variant="top"
                                            width="100%"
                                            height={160}
                                        />
                                        <CardBody className="card-body">
                                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                {course.name}
                                            </CardTitle>
                                            <CardText
                                                className="wd-dashboard-course-description overflow-hidden"
                                                style={{ height: "100px" }}
                                            >
                                                {course.description}
                                            </CardText>
                                            {(isEnrolled || currentUser.role === "FACULTY") && (
                                                <Button variant="primary">Go</Button>
                                            )}
                                            {currentUser.role === "FACULTY" && (
                                                <>
                                                    <button
                                                        id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(deleteCourse(course._id));
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
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        if (isEnrolled) {
                                                            dispatch(
                                                                unenrollUser({
                                                                    user: currentUser._id,
                                                                    course: course._id,
                                                                })
                                                            );
                                                        } else {
                                                            dispatch(
                                                                enrollUser({
                                                                    user: currentUser._id,
                                                                    course: course._id,
                                                                })
                                                            );
                                                        }
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
        </div>
    );
}
