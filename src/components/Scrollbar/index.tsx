import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, useTheme } from '@mui/material';

type ScrollbarProps = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Scrollbar({ className, children, ...rest }: ScrollbarProps) {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(['background'])}`,

              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`
              }
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};