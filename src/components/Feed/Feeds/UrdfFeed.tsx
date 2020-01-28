import React, { FC, useRef, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'utils/hooks/typedUseSelector'
import { styled } from 'globalStyles/styled'
import { NoFeed } from 'components/Feed/Feeds/utils/NoFeed'
import { IUrdfFeed } from 'store/modules/feed/@types'
import { rosClient } from 'utils/ros/rosClient'
import * as ROS3D from 'ros3d'
import ROSLIB, { TFClient } from 'roslib'
import { useRefSize } from 'utils/hooks/useRefSize'
import _ from 'lodash'

interface Props {
  feed: IUrdfFeed
}

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-items: center;
  background-color: black;
`

const StyledViewer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

function useUrdfViewerRef(): [
  ROS3D.Viewer | undefined,
  string,
  React.RefObject<HTMLDivElement>
] {
  const id = _.uniqueId('urdf-viewer-')
  const ref = useRef<HTMLDivElement>(null)
  const [width, height] = useRefSize(ref)
  const [viewer, setViewer] = useState<ROS3D.Viewer>()

  useEffect(() => {
    const localViewer = new ROS3D.Viewer({
      divID: id,
      width: width - 1,
      height: height - 1,
      antialias: true,
    })
    setViewer(localViewer)
    localViewer.addObject(new ROS3D.Grid())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    if (viewer) viewer.resize(width - 1, height - 1)
  }, [width, height, viewer])

  return [viewer, id, ref]
}

const View: FC<Props> = ({ feed }) => {
  const [viewer, id, ref] = useUrdfViewerRef()

  useEffect(() => {
    if (viewer) {
      const ros = rosClient.ros
      const mesh = new ROS3D.MeshResource({
        resource: 'test.dae',
        path: '/',
        warnings: true,
      })

      viewer.addObject(mesh)

      const tfClient = new TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
      })

      const urdfClient = new ROS3D.UrdfClient({
        ros: ros,
        tfClient: tfClient,
        path: 'http://resources.robotwebtools.org/',
        rootObject: viewer.scene,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // loader: ROS3D.COLLADA_LOADER_2,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <StyledViewer id={id} ref={ref} />
}

export const UrdfFeed: FC<Props> = ({ feed }) => {
  const connected = useSelector(state => state.ros.connected)

  return (
    <Grid>{!connected ? <View feed={feed} /> : <NoFeed text="no urdf" />}</Grid>
  )
}
