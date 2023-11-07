import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, Ref } from "react";
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import { Box, SxProps } from "@mui/system";

export type ModalProps = {
  open: boolean;
  handleClose: () => any;
  body: JSX.Element;
  title?: string;
  size?: Breakpoint;
  noControls?: boolean;
  sx?: SxProps;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: JSX.Element },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(props: ModalProps) {
  const { open, body, handleClose, title, size, noControls, sx } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth={size ?? "sm"}
      fullWidth={true}
      open={open}
      onClose={handleClose}
      sx={sx}
    >
      {title && (
        <DialogTitle>
          <Box display="flex" justifyContent={"center"} alignItems={"center"}>
            <Typography
              variant="h2"
              style={{
                fontWeight: 500,
                margin: 0,
              }}
            >
              {title}
            </Typography>
          </Box>
          {!noControls && (
            <Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          paddingBottom: 0,
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {body}
      </DialogContent>
      {!noControls && open && (
        <DialogActions sx={{ p: 1 }}>
          <Button variant="text" onClick={handleClose}>
            {t(I18nKeys.CLOSE)}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
