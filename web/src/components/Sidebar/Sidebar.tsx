import { FC, useState, useEffect } from 'react'
import {
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  People,
  CalendarToday,
  Check,
  LocalGroceryStore,
  Restaurant,
} from '@material-ui/icons'
import { NavLink, useLocation } from 'react-router-dom'

import useStyles from './SidebarStyles'

const Sidebar: FC<{}> = () => {
  const classes = useStyles()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState<string | null>(
    location.pathname
  )

  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location, location.pathname])

  const sidebarLinks = [
    { text: 'Family', icon: <People />, to: '/family' },
    { text: 'Calendar', icon: <CalendarToday />, to: '/calendar' },
    { text: 'Tasks', icon: <Check />, to: '/tasks' },
    { text: 'Groceries', icon: <LocalGroceryStore />, to: '/groceries' },
    { text: 'Recipes', icon: <Restaurant />, to: '/recipes' },
  ]

  const sidebarLinksList = sidebarLinks.map((link, index) => {
    return (
      <div key={index}>
        <ListItem
          component={NavLink}
          activeClassName={classes.activeLink}
          button
          to={link.to}
          className={classes.listItem}>
          <ListItemIcon
            className={currentPage === link.to ? classes.activeLink : ''}>
            {link.icon}
          </ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
        <Divider />
      </div>
    )
  })
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant='permanent'
        anchor='left'
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}>
        <List className={classes.list}>{sidebarLinksList}</List>
      </Drawer>
    </div>
  )
}

export default Sidebar
