import * as React from 'react'
import $store from '@/redux/index'
import { actionCreators, actionTypes } from '@/redux/modules/settings'

const withBreadcrumb = (options: actionTypes.BreadcrumbData[]) => {
  return <T extends {}>(WrappedComponent: React.ComponentType<T>) => {
    return (props: T) => {
      React.useEffect(() => {
        $store.dispatch<actionTypes.SettingsAction>(actionCreators.updateBreadcrumbData(options))
      }, [])

      return <WrappedComponent {...props} />
    }
  }
}

export default withBreadcrumb
