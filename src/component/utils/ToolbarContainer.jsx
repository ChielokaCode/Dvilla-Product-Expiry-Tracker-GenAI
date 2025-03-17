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
          onClick={() => onFormat("bold")}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={italicIcon}
          title="Italic"
          onClick={() => onFormat("italic")}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={underlineIcon}
          title="Underline"
          onClick={() => onFormat("underline")}
        />
      </ButtonGroup>

      <ButtonGroup>
        <Button
          className="k-toolbar-button"
          svgIcon={alignLeftIcon}
          title="Align Left"
          onClick={() => onFormat("justifyleft")}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={alignCenterIcon}
          title="Align Center"
          onClick={() => onFormat("justifycenter")}
        />
        <Button
          className="k-toolbar-button"
          svgIcon={alignRightIcon}
          title="Align Right"
          onClick={() => onFormat("justifyright")}
        />
        <ToolbarSeparator />
        <Button
          className="k-toolbar-button"
          svgIcon={cutIcon}
          title="Cut"
          onClick={() => onFormat("cut")}
        >
          Cut
        </Button>

        <Button
          className="k-toolbar-button"
          svgIcon={copyIcon}
          title="Copy"
          onClick={() => onFormat("copy")}
        >
          Copy
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
};

export default ToolbarContainer;
