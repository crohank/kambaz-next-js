/* eslint-disable */
"use client";
import { useState } from "react";
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
import { ChangeEvent } from "react"; 


interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface RootState {
  coursesReducer: {
    courses: Course[]; 
  };
  
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();

  
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  
  const handleCourseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourse({ ...course, [e.target.id]: e.target.value });
  };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end me-2"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(course))}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}
            id="wd-update-course-click"
          >
            Update{" "}
          </button>
          <button
            id="wd-edit-course-click"
            onClick={(event) => {
              event.preventDefault();
              
              dispatch(deleteCourse(course._id));
            }}
            className="btn btn-warning float-end me-2"
          >
            Edit
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
            }}
            className="btn btn-danger float-end me-2"
            id="wd-delete-course-click"
          >
            Delete
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
        />{" "}
        <hr />
        <Row xs={1} md={5} className="g-4">
          {/* FIX: Explicitly typed the 'course' parameter to fix the Type Error */}
          {courses.map((course: Course) => (
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
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
