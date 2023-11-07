import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'src/i18n/translations/I18nKeys';

type TitleProps = {
    title: string;
}

export default function Title(props: TitleProps) {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>{t(I18nKeys.APP_NAME)} - {t(props.title)}</title>
    </Helmet>
  );
}
