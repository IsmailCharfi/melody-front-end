import { Stack, Typography } from "@mui/material";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import { useTranslation } from "react-i18next";
import { I18nKeys } from "src/i18n/translations/I18nKeys";
import Modal from "src/components/Modal";
import { useDispatch, useSelector } from "src/store";
import { closeRegisterModal, openRegisterModal } from "src/slices/app";
import { BoxButton } from "src/layouts/AppLayout/TopBar";
import RegisterPage from "src/pages/Auth/RegisterPage";

export default function RegisterButton() {
  const { isRegisterModalOpen } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <BoxButton onClick={() => dispatch(openRegisterModal())}>
        <Stack direction={"row"} gap={1} display={"flex"} alignItems={"center"}>
          <PersonTwoToneIcon />
          <Typography variant="h5">{t(I18nKeys.REGISTER)}</Typography>
        </Stack>
      </BoxButton>
      <Modal
        size="lg"
        open={isRegisterModalOpen}
        title={t(I18nKeys.REGISTER)}
        handleClose={() => dispatch(closeRegisterModal())}
        body={<RegisterPage noTitle />}
        noControls
      />
    </>
  );
}
