import { Avatar as MuiAvatar, SxProps, Theme } from "@mui/material";

type AvatarProps = {
  sx?: SxProps<Theme>;
  src?: string;
  alt?: string;
  children?: JSX.Element;
};

export default function Avatar({ src, alt, sx, children }: AvatarProps) {
  const getInitials = (fullName: string) => {
    const seperatedNames = fullName.trim().split(" ");

    let initials = "";

    seperatedNames.forEach((name) => {
      if (name.length) {
        initials += name[0].toUpperCase();
      }
    });

    return initials;
  };

  return (
    <MuiAvatar
      sx={sx ?? {}}
      imgProps={{
        draggable: false,
        style: { objectFit: "contain" },
      }}
      variant="rounded"
      src={src}
      {...(alt ? { children: getInitials(alt) } : {})}
      {...(children ? { children } : {})}
    />
  );
}
