import { useState, MouseEvent } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  IconButton,
  Box,
  Badge,
  Popover,
  darken,
  ListItem,
  styled
} from '@mui/material';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import Scrollbar from 'src/components/Scrollbar';
import { useDispatch } from 'src/store';
import { closeSidebar } from 'src/slices/app';

const IndicatorWrapper = styled(Box)(
  () => `
  width: 18px;
  height: 18px;

  .MuiSvgIcon-root {
    width: 100%;
    height: auto;
  }
`
);

const PopoverWrapper = styled(Popover)(
  ({ theme }) => `
  .MuiList-root {
    min-width: 240px;
    padding: ${theme.spacing(2)} !important;

    .MuiListItem-root {
      padding: 2px 0 !important;

      &:last-child {
          margin-left: 0;
        }
      }

      .MuiIconButton-root {
        width: 100% !important;
        height: auto !important;
        justify-content: flex-start !important;
        font-weight: bold !important;
        padding: ${theme.spacing(1, 2)} !important;

        .MuiBadge-root {
          right: 20px !important;
          top: 20px !important;

          .MuiBadge-badge {
            background: ${theme.colors.primary.main} !important;
            color: ${theme.palette.getContrastText(
              theme.colors.primary.main
            )} !important;
          }
        }

        .name-wrapper {
          transition: ${theme.transitions.create(['all'])};

          color: ${darken(theme.sidebar.menuItemColor, 0.3)} !important;
        }

        &.active,
        &:hover {
          .name-wrapper {
            color: ${theme.palette.primary.main} !important;
          }
        }
      }
    }  
  }
`
);

type NavigationMenuItemProps = {
  children?: JSX.Element;
  link?: string;
  icon?: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  name: string;
};

export default function NavigationMenuItem({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}: NavigationMenuItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (children) {
    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <IconButton className={clsx({ active: open })} onClick={handleClick}>
          {Icon && <Icon />}
          <span className="name-wrapper">{name}</span>
          <IndicatorWrapper>
            {open ? (
              <KeyboardArrowUpTwoToneIcon />
            ) : (
              <KeyboardArrowDownTwoToneIcon />
            )}
          </IndicatorWrapper>
          {badge === '' ? (
            <Badge color="primary" variant="dot" />
          ) : (
            <Badge badgeContent={badge} />
          )}
        </IconButton>
        <PopoverWrapper
          classes={{ root: 'child-popover' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          open={open}
        >
          <Box
            sx={{
              width: 260,
              height: 295
            }}
          >
            <Scrollbar>{children}</Scrollbar>
          </Box>
        </PopoverWrapper>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <IconButton
        component={RouterLink}
        onClick={() => dispatch(closeSidebar())}
        to={link}
      >
        {Icon && <Icon />}
        <span className="name-wrapper">{name}</span>
        {badge === '' ? (
          <Badge color="primary" variant="dot" />
        ) : (
          <Badge badgeContent={badge} />
        )}
      </IconButton>
    </ListItem>
  );
}