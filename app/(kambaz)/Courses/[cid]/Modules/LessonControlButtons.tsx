import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark/>
            <IoEllipsisVertical className="fs-4"/>
        </div>);
}