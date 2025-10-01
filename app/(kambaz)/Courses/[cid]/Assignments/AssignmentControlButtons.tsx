import 'bootstrap/dist/css/bootstrap.min.css';
import GreenCheckmark from './GreenCheckMark';
import { FaEllipsisV } from "react-icons/fa";
export default function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
        <GreenCheckmark/>
        <FaEllipsisV />
    </div>    
);}