import React, { FC } from 'react'
import {
  MenuList,
  StyledNavLink,
} from 'components/pages/Config/ConfigMenu.styles'

export const ConfigMenu: FC = () => {
  return (
    <aside>
      <MenuList>
        <li>
          <StyledNavLink to="/config/ros" activeClassName="is-active">
            ROS
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/config/camera" activeClassName="is-active">
            Camera
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/config/gamepad" activeClassName="is-active">
            Gamepad
          </StyledNavLink>
        </li>
      </MenuList>
    </aside>
  )
}
