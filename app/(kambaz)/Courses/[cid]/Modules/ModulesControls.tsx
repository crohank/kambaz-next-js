import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex flex-wrap justify-content-end gap-2 md-2">
      <Button
        variant="secondary"
        size="lg"
        id="wd-add-module-btn"
      >
        Collapse All
      </Button>

      
      <Button
        variant="secondary"
        size="lg"
        id="wd-view-progress-module-btn"
      >
        View Progress
      </Button>

      <Dropdown>
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <MdBlock /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <MdBlock /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        variant="danger"
        size="lg"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" />
        Module
      </Button>
    </div>
  );
}
