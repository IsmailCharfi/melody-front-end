import { CircularProgress, Box, SxProps } from '@mui/material';

type LoadingSpinnerProps = {
  sx?: SxProps;
  progressSx?: SxProps;
  size?: number | string
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      sx={props.sx ?? {}}
    >
      <CircularProgress color="primary" sx={props.progressSx ?? {}} size={props.size}/>
    </Box>
  );
}
