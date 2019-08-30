import * as React from 'react'
import { ICameraFeed, CameraType } from 'store/modules/feed/@types'

import { useSelector } from 'utils/hooks/typedUseSelector'
import { FC } from 'react'
import { selectVideoStreamUrl } from 'store/modules/ros/reducer'

interface Props {
  feed: ICameraFeed
}

const NoVideo: FC<{ text: string }> = ({ text }) => <p>{text}</p>

const View: FC<Props> = ({ feed }) => {
  const source = useSelector(selectVideoStreamUrl(feed.camera))

  switch (feed.camera.type) {
    case CameraType.MJPEG:
    case CameraType.PNG:
      return <img src={source} alt="camera stream" />
    case CameraType.VP8:
      return <video src={source} autoPlay preload="none" />
    default:
      return <NoVideo text="stream type not supported" />
  }
}

export const CameraFeed: FC<Props> = ({ feed }) => {
  const connected = useSelector(state => state.ros.connected)

  return connected ? <View feed={feed} /> : <NoVideo text="no video" />
}
