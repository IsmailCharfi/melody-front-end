import { Stack, Typography } from "@mui/material";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import { useTranslation } from "react-i18next";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import Modal from "src/components/Modal";
import { useDispatch, useSelector } from "src/store";
import { closeLoginModal, openLoginModal } from "src/slices/app";
import { BoxButton } from "src/layouts/AppLayout/TopBar";

export default function LoginButton() {
  const { isLoginModalOpen } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <BoxButton onClick={() => dispatch(openLoginModal())}>
        <Stack direction={"row"} gap={1} display={"flex"} alignItems={"center"}>
          <PersonTwoToneIcon />
          <Typography variant="h5">{t(I18nKeys.LOGIN)}</Typography>
        </Stack>
      </BoxButton>
      <Modal
        open={isLoginModalOpen}
        title={t(I18nKeys.LOGIN)}
        handleClose={() => dispatch(closeLoginModal())}
        body={<>test</>}
        noControls
      />
    </>
  );
}
