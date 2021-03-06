import React, { FC } from 'react'
import { Feed } from 'components/Feed/Feed'
import { useArmControl } from 'utils/hooks/useArmControl'

export const Teleop: FC = () => {
  useArmControl(false)
  return <Feed id="teleop_main" defaultFeed="camera_3d_rgb" />
}
