import "bootstrap/dist/css/bootstrap.min.css";
import GreenCheckmark from "./GreenCheckMark";
import { FaEllipsisV } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  onDelete?: () => void;
}

export default function AssignmentControlButtons({ onDelete }: Props) {
  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      <MdDeleteOutline
        className="text-danger fs-4 mx-2 cursor-pointer"
        onClick={onDelete}
        title="Delete assignment"
      />
      <FaEllipsisV />
    </div>
  );
}
