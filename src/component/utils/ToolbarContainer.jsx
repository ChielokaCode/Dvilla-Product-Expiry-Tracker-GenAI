import * as React from "react";
import {
  Toolbar,
  ToolbarSeparator,
  Button,
  ButtonGroup,
} from "@progress/kendo-react-buttons";
import {
  alignCenterIcon,
  alignLeftIcon,
  alignRightIcon,
  boldIcon,
  copyIcon,
  cutIcon,
  italicIcon,
  underlineIcon,
} from "@progress/kendo-svg-icons";

const ToolbarContainer = ({ onFormat }) => {
  return (
    <Toolbar>
      <ButtonGroup>
        <Button
          className="k-toolbar-button"
          svgIcon={boldIcon}
          title="Bold"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("bold");
          }}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={italicIcon}
          title="Italic"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("italic");
          }}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={underlineIcon}
          title="Underline"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("underline");
          }}
        />
      </ButtonGroup>

      <ButtonGroup>
        <Button
          className="k-toolbar-button"
          svgIcon={alignLeftIcon}
          title="Align Left"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("justifyleft");
          }}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={alignCenterIcon}
          title="Align Center"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("justifycenter");
          }}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={alignRightIcon}
          title="Align Right"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("justifyright");
          }}
        />
        <ToolbarSeparator />
        <Button
          className="k-toolbar-button"
          svgIcon={cutIcon}
          title="Cut"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("cut");
          }}
        >
          Cut
        </Button>

        <Button
          className="k-toolbar-button"
          svgIcon={copyIcon}
          title="Copy"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            onFormat("copy");
          }}
        >
          Copy
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
};

export default ToolbarContainer;
