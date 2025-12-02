// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useRouter } from "next/navigation";
// import { addAssignment, updateAssignment } from "../reducer";
// import {
//   createAssignmentForCourse,
//   updateAssignment as updateAssignmentAPI,
//   findAssignmentById,
// } from "@/app/(kambaz)/Courses/[cid]/Assignments/client";

// export default function AssignmentEditor() {
//   const { assignments } = useSelector((state: any) => state.assignmentsReducer);
//   const { cid, aid } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const isNew = aid === "new";
//   const existing = isNew ? null : assignments.find((a: any) => a._id === aid);

//   const [loaded, setLoaded] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [points, setPoints] = useState(0);
//   const [group, setGroup] = useState("Assignments");
//   const [displayGradeAs, setDisplayGradeAs] = useState("Percentage");
//   const [submissionType, setSubmissionType] = useState("Online");
//   const [releaseDate, setReleaseDate] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [availableUntil, setAvailableUntil] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       let data = existing;

//       if (!isNew && !existing && aid) {
//         data = await findAssignmentById(aid as string);
//       }

//       if (data) {
//         setTitle(data.title ?? "");
//         setDescription(data.description ?? "");
//         setPoints(data.points ?? 0);
//         setGroup(data.group ?? "Assignments");
//         setDisplayGradeAs(data.displayGradeAs ?? "Percentage");
//         setSubmissionType(data.submissionType ?? "Online");
//         setReleaseDate(data.releaseDate ?? "");
//         setDueDate(data.dueDate ?? "");
//         setAvailableUntil(data.availableUntil ?? data.dueDate ?? "");
//       }

//       setLoaded(true);
//     };

//     load();
//   }, [aid, existing, isNew]);

//   if (!loaded) return null;

//   const handleCancel = () => {
//     router.push(`/Courses/${cid}/Assignments`);
//   };

//   const handleSave = async () => {
//     const payload = {
//       title,
//       description,
//       points,
//       group,
//       displayGradeAs,
//       submissionType,
//       releaseDate,
//       dueDate,
//       availableUntil,
//       course: cid,
//     };

//     if (isNew) {
//       const newAssignment = await createAssignmentForCourse(cid as string, payload);
//       dispatch(addAssignment(newAssignment));
//     } else {
//       const updated = await updateAssignmentAPI({ ...existing, ...payload });
//       dispatch(updateAssignment(updated));
//     }

//     router.push(`/Courses/${cid}/Assignments`);
//   };

//   return (
//     <div id="wd-assignments-editor" className="container-fluid">
//       <div className="mb-3">
//         <label htmlFor="wd-name" className="form-label">Assignment Name</label>
//         <input
//           id="wd-name"
//           className="form-control"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="wd-description" className="form-label">Description</label>
//         <div className="card">
//           <div className="card-body">
//             <textarea
//               id="wd-description"
//               className="form-control border-0 p-0"
//               rows={5}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
//         <div className="col-sm-9">
//           <input
//             id="wd-points"
//             className="form-control"
//             type="number"
//             value={points}
//             onChange={(e) => setPoints(Number(e.target.value))}
//           />
//         </div>
//       </div>

//       <div className="row mb-3">
//         <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
//         <div className="col-sm-9">
//           <select
//             id="wd-group"
//             className="form-select"
//             value={group}
//             onChange={(e) => setGroup(e.target.value)}
//           >
//             <option value="Assignments">Assignments</option>
//             <option value="Labs">Labs</option>
//           </select>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">
//           Display Grade As
//         </label>
//         <div className="col-sm-9">
//           <select
//             id="wd-display-grade-as"
//             className="form-select"
//             value={displayGradeAs}
//             onChange={(e) => setDisplayGradeAs(e.target.value)}
//           >
//             <option value="Percentage">Percentage</option>
//             <option value="GPA">GPA</option>
//           </select>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">
//           Submission Type
//         </label>
//         <div className="col-sm-9">
//           <div className="border rounded p-3">
//             <select
//               id="wd-submission-type"
//               className="form-select mb-3"
//               value={submissionType}
//               onChange={(e) => setSubmissionType(e.target.value)}
//             >
//               <option value="Online">Online</option>
//               <option value="Physical">Physical</option>
//             </select>

//             <label className="form-label fw-bold">Online Entry Options</label>
//             {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map(
//               (option, i) => (
//                 <div className="form-check" key={i}>
//                   <input className="form-check-input" type="checkbox" id={`option-${i}`} />
//                   <label className="form-check-label" htmlFor={`option-${i}`}>
//                     {option}
//                   </label>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label text-end">
//           Assign
//         </label>
//         <div className="col-sm-9">
//           <div className="border rounded p-3">
//             <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
//             <input id="wd-assign-to" className="form-control mb-3" defaultValue="Everyone" />

//             <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
//             <input
//               type="datetime-local"
//               id="wd-due-date"
//               className="form-control mb-3"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//             />

//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
//                 <input
//                   type="datetime-local"
//                   id="wd-available-from"
//                   className="form-control"
//                   value={releaseDate}
//                   onChange={(e) => setReleaseDate(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
//                 <input
//                   type="datetime-local"
//                   id="wd-available-until"
//                   className="form-control"
//                   value={availableUntil}
//                   onChange={(e) => setAvailableUntil(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr />

//       <div className="d-flex justify-content-end gap-2">
//         <button
//           type="button"
//           id="wd-assignment-cancel"
//           className="btn btn-secondary"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           id="wd-assignment-Save"
//           className="btn btn-danger"
//           onClick={handleSave}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { addAssignment, updateAssignment } from "../reducer";
import {
  createAssignmentForCourse,
  updateAssignment as updateAssignmentAPI,
  findAssignmentById,
} from "@/app/(kambaz)/Courses/[cid]/Assignments/client";


const formatDateForInput = (date: any): string => {
  if (!date) return "";
  
  let dateObj: Date;
  
  
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === "string") {
    
    dateObj = new Date(date);
  } else {
    return "";
  }
  
  
  if (isNaN(dateObj.getTime())) {
    return "";
  }
  
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function AssignmentEditor() {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const isNew = aid === "new";
  const existing = isNew ? null : assignments.find((a: any) => a._id === aid);

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [group, setGroup] = useState("Assignments");
  const [displayGradeAs, setDisplayGradeAs] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [releaseDate, setReleaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  useEffect(() => {
    const load = async () => {
      let data = existing;

      if (!isNew && !existing && aid) {
        data = await findAssignmentById(aid as string);
      }

      if (data) {
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setPoints(data.points ?? 0);
        setGroup(data.group ?? "Assignments");
        setDisplayGradeAs(data.displayGradeAs ?? "Percentage");
        setSubmissionType(data.submissionType ?? "Online");
        
        
        setReleaseDate(formatDateForInput(data.releaseDate));
        setDueDate(formatDateForInput(data.dueDate));
        
        setAvailableUntil(formatDateForInput(data.availableUntil || data.dueDate));
      }

      setLoaded(true);
    };

    load();
  }, [aid, existing, isNew]);

  if (!loaded) return null;

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleSave = async () => {
    const payload = {
      title,
      description,
      points,
      group,
      displayGradeAs,
      submissionType,
      releaseDate,
      dueDate,
      availableUntil,
      course: cid,
    };

    if (isNew) {
      const newAssignment = await createAssignmentForCourse(cid as string, payload);
      dispatch(addAssignment(newAssignment));
    } else {
      const updated = await updateAssignmentAPI({ ...existing, ...payload });
      dispatch(updateAssignment(updated));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container-fluid">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <div className="card">
          <div className="card-body">
            <textarea
              id="wd-description"
              className="form-control border-0 p-0"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
        <div className="col-sm-9">
          <input
            id="wd-points"
            className="form-control"
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-9">
          <select
            id="wd-group"
            className="form-select"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="Assignments">Assignments</option>
            <option value="Labs">Labs</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">
          Display Grade As
        </label>
        <div className="col-sm-9">
          <select
            id="wd-display-grade-as"
            className="form-select"
            value={displayGradeAs}
            onChange={(e) => setDisplayGradeAs(e.target.value)}
          >
            <option value="Percentage">Percentage</option>
            <option value="GPA">GPA</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">
          Submission Type
        </label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <select
              id="wd-submission-type"
              className="form-select mb-3"
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </select>

            <label className="form-label fw-bold">Online Entry Options</label>
            {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map(
              (option, i) => (
                <div className="form-check" key={i}>
                  <input className="form-check-input" type="checkbox" id={`option-${i}`} />
                  <label className="form-check-label" htmlFor={`option-${i}`}>
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label text-end">
          Assign
        </label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
            <input id="wd-assign-to" className="form-control mb-3" defaultValue="Everyone" />

            <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
            <input
              type="datetime-local"
              id="wd-due-date"
              className="form-control mb-3"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  className="form-control"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          id="wd-assignment-cancel"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          id="wd-assignment-Save"
          className="btn btn-danger"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

