import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";

import { DialogProps } from "core/components/dialogs/types";

export interface ErrorDialogProps extends DialogProps {
  title: React.ReactChild;
  children: React.ReactChild;
}

export const ErrorDialog = (props: ErrorDialogProps): JSX.Element => (
  <Dialog open={props.isOpen} onClose={props.onClose}>
    <DialogTitle
      disableTypography={true}
      classes={{ root: "bg-error text-on-error" }}
    >
      <div className="flex items-center">
        <Warning className="mr-lg" />
        <Typography variant="h6">{props.title}</Typography>
      </div>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{props.children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
