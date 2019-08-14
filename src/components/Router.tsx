import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Teleop } from 'components/pages/Teleop'
import { Victim } from 'components/pages/Victim'
import { MapPage } from 'components/pages/MapPage'
import { Config } from 'components/pages/Config'

export const Router: FC = () => {
  return (
    <Switch>
      <Route path="/teleop" component={Teleop} />
      <Route path="/victim" component={Victim} />
      <Route path="/map" component={MapPage} />
      <Route path="/config" component={Config} />
    </Switch>
  )
}
