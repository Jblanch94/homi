import { Drawer, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { FC, KeyboardEvent, useState } from 'react'
import SideDrawerList from './SideDrawerList'

import { INavLink } from '../types'

interface ISideDrawer {
  navLinks: INavLink[]
}

const SideDrawer: FC<ISideDrawer> = ({ navLinks }) => {
  const [active, setActive] = useState({
    right: false,
  })

  const toggleDrawer =
    (anchor: string, open: boolean) => (evt: KeyboardEvent) => {
      if (
        evt.type === 'keydown' &&
        (evt.key === 'Tab' || evt.key === 'Shift')
      ) {
        return
      }

      setActive({ right: open })
    }

  const onMenuClick = (anchor: string, open: boolean) => (evt: any) => {
    setActive({ right: open })
  }

  return (
    <>
      <IconButton
        edge='start'
        aria-label='menu'
        onClick={onMenuClick('right', true)}
        component={Menu}
      />

      <Drawer
        anchor='right'
        open={active.right}
        onClose={toggleDrawer('right', false)}>
        <SideDrawerList navLinks={navLinks} active={active.right} />
      </Drawer>
    </>
  )
}

export default SideDrawer
