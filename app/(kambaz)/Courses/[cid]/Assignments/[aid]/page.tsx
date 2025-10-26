"use client";

import * as db from "../../../../Database";
import {usePathname} from "next/navigation";

export default function AssignmentEditor() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const assignmentId = segments[4];


    const assignment = db.assignments.find((a) => a._id === assignmentId);

    if (!assignment) return <p>Assignment not found</p>;

    return (
        <div id="wd-assignments-editor" className="container-fluid">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">
                    Assignment Name
                </label>
                <input
                    id="wd-name"
                    className="form-control"
                    defaultValue={assignment.title}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">
                    Description
                </label>
                <div className="card" contentEditable={true}>
                    <div className="card-body">
                        <input
                            id="wd-description"
                            className="form-control border-0 p-0"
                            type="text"
                            defaultValue="The assignment is available online"
                        />
                        <p className="card-text mt-2 mb-0">
                            Submit a link to the landing page of your Web application running
                            on Netlify
                        </p>
                        <p className="card-text mt-2 mb-0">
                            The landing page should include the following:
                        </p>
                        <ul className="mb-0">
                            <li>Your Full name and Section</li>
                            <li>Links to each of the lab assignments</li>
                            <li>Link to the kambaz application</li>
                            <li>Links to all relevant source code repositories</li>
                        </ul>
                        <p className="card-text mt-2 mb-0">
                            The kambaz application should include a link to navigate back to
                            the landing page.
                        </p>
                        <br/>
                        <p>
                            {assignment.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="wd-points"
                    className="col-sm-3 col-form-label text-end"
                >
                    Points
                </label>
                <div className="col-sm-9">
                    <input
                        id="wd-points"
                        className="form-control"
                        defaultValue={assignment.points}
                        type="number"
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">
                    Assignment Group
                </label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-select">
                        <option value="Assignments">Assignments</option>
                        <option value="Labs">Labs</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="wd-display-grade-as"
                    className="col-sm-3 col-form-label text-end"
                >
                    Display Grade As
                </label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="Percentage">Percentage</option>
                        <option value="GPA">GPA</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="wd-submission-type"
                    className="col-sm-3 col-form-lable text-end"
                >
                    Submission Type
                </label>
                <div className="col-sm-9">
                    <div className="border rounded p-3">
                        <select id="wd-submission-type" className="form-select mb-3">
                            <option value="Online">Online</option>
                            <option value="Physical">Physical</option>
                        </select>

                        <div>
                            <label className="form-lable fw-bold">Online Entry Options</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wd-text-entry"/>
                                <label className="form-check-label" htmlFor="wd-text-entry">
                                    Text Entry
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked/>
                                <label className="form-check-label" htmlFor="wd-website-url">
                                    Website URL
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wd-media-recordings"/>
                                <label className="form-check-label" htmlFor="wd-media-recordings">
                                    Media Recordings
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wd-student-annotation"/>
                                <label className="form-check-label" htmlFor="wd-student-annotation">
                                    Student Annotation
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wd-file-upload"/>
                                <label className="form-check-label" htmlFor="wd-file-upload">
                                    File Uploads
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="wd-assign-to"
                    className="col-sm-3 col-form-label text-end"
                >
                    Assign
                </label>
                <div className="col-sm-9">
                    <div className="border rounded p-3">
                        <label htmlFor="wd-assign-to" className="form-label fw-bold">
                            Assign to
                        </label>
                        <input
                            id="wd-assign-to"
                            className="form-control mb-3"
                            defaultValue="Everyone"
                        />

                        <label htmlFor="wd-due-date" className="form-label fw-bold">
                            Due
                        </label>
                        <input
                            type="datetime-local"
                            id="wd-due-date"
                            className="form-control mb-3"
                            defaultValue={assignment.dueDate}
                        />

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label
                                    htmlFor="wd-available-from"
                                    className="form-label fw-bold"
                                >
                                    Available from
                                </label>
                                <input
                                    type="datetime-local"
                                    id="wd-available-from"
                                    className="form-control"
                                    defaultValue={assignment.releaseDate}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label
                                    htmlFor="wd-available-until"
                                    className="form-label fw-bold"
                                >
                                    Until
                                </label>
                                <input
                                    type="datetime-local"
                                    id="wd-available-until"
                                    className="form-control"
                                    defaultValue={assignment.dueDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>

            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    id="wd-assignment-cancel"
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    id="wd-assignment-Save"
                    className="btn btn-danger"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
