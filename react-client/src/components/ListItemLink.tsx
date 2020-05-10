// import React from 'react'
// import { Link as RouterLink } from 'react-router-dom';
// import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// import { Omit } from '@material-ui/types';

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';

const ListItemLink: React.FC<{
  icon?: React.ReactElement,
  primary: string,
  to: string
}> = ({ icon, primary, to }) => {
  const renderLink = React.useMemo(() =>
    React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
      <RouterLink to={to} ref={ref} {...itemProps} />
    )),
    [to],
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink
