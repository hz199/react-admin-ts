import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'

const tagNavConfig: actionTypes.TagNavConfig = {
  path: '/app',
  title: '首页',
  flag: true,
  color: 'default'
}

const defaultStore: actionTypes.SettingState = {
  ScreenWidth: 0,
  tagNav: [tagNavConfig],
  tagNavRouter: ['/app']
}

/**
 * 设置 顶部导航数据
 */
const setTagsNav = (state: actionTypes.SettingState, data: actionTypes.SetTagsNavOptions) => {
  const TagsNav: actionTypes.TagNavConfig[] = JSON.parse(window.localStorage.getItem('zh_tag_page') as string)
  const tagPath: Array<string> = JSON.parse(window.localStorage.getItem('zh_tag_path') as string)

  const currentRouter: actionTypes.TagNavConfig = {
    path: data.path,
    title: data.title
  }

  let initTagsNav = TagsNav || [tagNavConfig]
  const initTagPath = tagPath || ['/app']

  if (initTagPath.indexOf(data.path) < 0) {
    initTagPath.push(data.path)
    initTagsNav.push(currentRouter)
  }

  initTagsNav = initTagsNav.map((item) => {
    if (item.path === currentRouter.path) {
      item.color = 'primary'
      return item
    } else {
      item.color = 'default'
      return item
    }
  })

  window.localStorage.setItem('zh_tag_page', JSON.stringify(initTagsNav))
  window.localStorage.setItem('zh_tag_path', JSON.stringify(initTagPath))
  return Object.assign({}, state, { tagNav: initTagsNav, tagNavRouter: initTagPath })
}

/**
 * 设置 Reducer
 * @param state
 * @param action
 */
const settingReducer = (state = defaultStore, action: actionTypes.SettingsAction) => {
  switch (action.type) {
    case actionTypes.SET_SCREEN_WIDTH:
      return Object.assign({}, state, { ScreenWidth: action.data })
    case actionTypes.SET_TAG_PAGE:
      return setTagsNav(state, action.data)
    default:
      return state
  }
}

export { settingReducer, actionTypes, actionCreators }
