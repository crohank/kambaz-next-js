/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import * as client from "../../client";
// import {FormControl, ListGroup, ListGroupItem} from "react-bootstrap";
// import ModulesControls from "./ModulesControls";
// import {BsGripVertical} from "react-icons/bs";
// import LessonControlButtons from "./LessonControlButtons";
// import ModuleControlButtons from "./ModuleControlButtons";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {useParams} from "next/navigation";
// import {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import { setModules ,addModule, deleteModule, editModule, updateModule,} from "./reducer";

// export default function Modules() {
//     const {cid} = useParams();
//     const dispatch = useDispatch();
//     const {modules} = useSelector((state: any) => state.modulesReducer);

//     const [moduleName, setModuleName] = useState("");


//     const courseModules = modules.filter((m: any) => m.course === cid);


//      const fetchModules = async () => {
//     const modules = await client.findModulesForCourse(cid as string);
//     dispatch(setModules(modules));
//   };
//   useEffect(() => {
//     fetchModules();
//   }, []);

//    const onCreateModuleForCourse = async () => {
//     if (!cid) return;
//     const newModule = { name: moduleName, course: cid };
//     const module = await client.createModuleForCourse(cid, newModule);
//     dispatch(setModules([...modules, module]));
//   };

//    const onRemoveModule = async (moduleId: string) => {
//     await client.deleteModule(moduleId);
//     dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
//   };

//    const onUpdateModule = async (module: any) => {
//     await client.updateModule(module);
//     const newModules = modules.map((m: any) => m._id === module._id ? module : m );
//     dispatch(setModules(newModules));
//   };


//     return (
//         <div className="wd-modules">

//             <ModulesControls
//                 moduleName={moduleName}
//                 setModuleName={setModuleName}
//                 addModule={() => {
//                     if (!moduleName.trim()) return;
//                     dispatch(addModule({name: moduleName, course: cid}));
//                     setModuleName("");
//                 }}
//             />

//             <br/>


//             <ListGroup id="wd-modules" className="rounded-0">
//                 {courseModules.map((module: any) => (
//                     <ListGroupItem
//                         key={module._id}
//                         className="wd-module p-0 mb-5 fs-5 border-secondary"
//                     >
//                         <div
//                             className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
//                             <div>
//                                 <BsGripVertical className="me-2 fs-3"/>


//                                 {!module.editing && module.name}
//                                 {module.editing && (
//                                     <FormControl
//                                         className="w-50 d-inline-block"
//                                         onChange={(e) =>
//                                             dispatch(
//                                                 updateModule({...module, name: e.target.value})
//                                             )
//                                         }
//                                         onKeyDown={(e) => {
//                                             if (e.key === "Enter") {
//                                                 dispatch(updateModule({...module, editing: false}));
//                                             }
//                                         }}
//                                         defaultValue={module.name}
//                                     />
//                                 )}
//                             </div>


//                             <ModuleControlButtons
//                                 moduleId={module._id}
//                                 deleteModule={(moduleId: string) =>
//                                     dispatch(deleteModule(moduleId))
//                                 }
//                                 editModule={(moduleId: string) =>
//                                     dispatch(editModule(moduleId))
//                                 }
//                             />
//                         </div>


//                         {module.lessons && (
//                             <ListGroup className="wd-lessons rounded-0">
//                                 {module.lessons.map((lesson: any) => (
//                                     <ListGroupItem
//                                         key={lesson._id}
//                                         className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
//                                     >
//                                         <div>
//                                             <BsGripVertical className="me-2 fs-3"/>
//                                             {lesson.name}
//                                         </div>
//                                         <LessonControlButtons/>
//                                     </ListGroupItem>
//                                 ))}
//                             </ListGroup>
//                         )}
//                     </ListGroupItem>
//                 ))}
//             </ListGroup>
//         </div>
//     );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../../client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModules,
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");

  const fetchModules = useCallback(async () => {
    if (!cid) return;
    const modules = await client.findModulesForCourse(cid);
    dispatch(setModules(modules));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (m: any) => {
    await client.updateModule(m);
    const newModules = modules.map((mod: any) =>
      mod._id === m._id ? m : mod
    );
    dispatch(setModules(newModules));
  };

  const courseModules = modules.filter((m: any) => m.course === cid);

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((m: any) => (
          <ListGroupItem
            key={m._id}
            className="wd-module p-0 mb-5 fs-5 border-secondary"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {!m.editing && m.name}
                {m.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...m, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...m, editing: false });
                      }
                    }}
                    defaultValue={m.name}
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={m._id}
                deleteModule={() => onRemoveModule(m._id)}
                editModule={(moduleId: string) =>
                  dispatch(editModule(moduleId))
                }
              />
            </div>

            {m.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {m.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
