/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {FormControl, ListGroup, ListGroupItem} from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import {BsGripVertical} from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import "bootstrap/dist/css/bootstrap.min.css";
import {useParams} from "next/navigation";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addModule, deleteModule, editModule, updateModule,} from "./reducer";

export default function Modules() {
    const {cid} = useParams();
    const dispatch = useDispatch();
    const {modules} = useSelector((state: any) => state.modulesReducer);

    const [moduleName, setModuleName] = useState("");


    const courseModules = modules.filter((m: any) => m.course === cid);

    return (
        <div className="wd-modules">

            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    if (!moduleName.trim()) return;
                    dispatch(addModule({name: moduleName, course: cid}));
                    setModuleName("");
                }}
            />

            <br/>


            <ListGroup id="wd-modules" className="rounded-0">
                {courseModules.map((module: any) => (
                    <ListGroupItem
                        key={module._id}
                        className="wd-module p-0 mb-5 fs-5 border-secondary"
                    >
                        <div
                            className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                            <div>
                                <BsGripVertical className="me-2 fs-3"/>


                                {!module.editing && module.name}
                                {module.editing && (
                                    <FormControl
                                        className="w-50 d-inline-block"
                                        onChange={(e) =>
                                            dispatch(
                                                updateModule({...module, name: e.target.value})
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({...module, editing: false}));
                                            }
                                        }}
                                        defaultValue={module.name}
                                    />
                                )}
                            </div>


                            <ModuleControlButtons
                                moduleId={module._id}
                                deleteModule={(moduleId: string) =>
                                    dispatch(deleteModule(moduleId))
                                }
                                editModule={(moduleId: string) =>
                                    dispatch(editModule(moduleId))
                                }
                            />
                        </div>


                        {module.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson: any) => (
                                    <ListGroupItem
                                        key={lesson._id}
                                        className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <BsGripVertical className="me-2 fs-3"/>
                                            {lesson.name}
                                        </div>
                                        <LessonControlButtons/>
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
