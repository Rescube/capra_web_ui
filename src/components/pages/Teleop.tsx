import React, { FC } from 'react'
import { Feed } from 'components/Feed/Feed'

export const Teleop: FC = () => {
  return <Feed id="teleop_main" defaultFeed="camera_3d_rgb" />
}