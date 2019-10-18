import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'
import * as H from 'history'

const tagNavConfig: actionTypes.TagNavConfig = {
  path: '/app',
  title: '首页',
  flag: true,
  color: 'default'
}

const defaultStore: actionTypes.SettingState = {
  ScreenWidth: 0,
  tagNav: [tagNavConfig],
  tagNavRouter: ['/app'],
  breadcrumbList: []
}

const localStorageKey = 'ZH_TAG_KEY'
const localStoragePathKey = 'ZH_TAG_PATH_KEY'

/**
 * 设置 顶部导航数据
 */
const setTagsNav = (state: actionTypes.SettingState, data: actionTypes.SetTagsNavOptions) => {
  const TagsNav: actionTypes.TagNavConfig[] = JSON.parse(window.localStorage.getItem(
    localStorageKey
  ) as string)
  const tagPath: Array<string> = JSON.parse(window.localStorage.getItem(
    localStoragePathKey
  ) as string)

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

  window.localStorage.setItem(localStorageKey, JSON.stringify(initTagsNav))
  window.localStorage.setItem(localStoragePathKey, JSON.stringify(initTagPath))
  return Object.assign({}, state, { tagNav: initTagsNav, tagNavRouter: initTagPath })
}

/**
 * 删除所有 tagsNav
 * @param state
 * @param data
 */
const deleteAllTag = (state: actionTypes.SettingState, data: H.History) => {
  setTimeout(() => {
    data && data.push('/app')
  }, 50)

  const initTagPage = [tagNavConfig]
  const initTagPath = ['/app']

  window.localStorage.setItem(localStorageKey, JSON.stringify(initTagPage))
  window.localStorage.setItem(localStoragePathKey, JSON.stringify(initTagPath))
  return Object.assign({}, state, { tagNav: initTagPage, tagNavRouter: initTagPath })
}

const deleteOtherTag = (state: actionTypes.SettingState) => {
  let { tagNav } = JSON.parse(JSON.stringify(state)) as actionTypes.SettingState

  const tagPageRouter: Array<string> = []

  tagNav = tagNav.filter((item) => {
    if (item.color !== 'default' || item.path === '/app') {
      tagPageRouter.push(item.path)
      return true
    } else {
      return false
    }
  })

  window.localStorage.setItem(localStorageKey, JSON.stringify(tagNav))
  window.localStorage.setItem(localStoragePathKey, JSON.stringify(tagPageRouter))
  return Object.assign({}, state, { tagNav, tagPageRouter })
}

const deleteOneTag = (state: actionTypes.SettingState, data: actionTypes.DeleteOneTagData) => {
  const { tagNav, tagNavRouter } = JSON.parse(JSON.stringify(state)) as actionTypes.SettingState
  const currentIndex = tagNavRouter.indexOf(data.path)
  const currentPrimaryRoute = tagNav[currentIndex]

  tagNav.splice(currentIndex, 1)
  tagNavRouter.splice(currentIndex, 1)

  if (currentPrimaryRoute.color === 'primary') {
    setTimeout(() => {
      data.history.push(tagNavRouter[currentIndex - 1])
    }, 50)
  }

  window.localStorage.setItem(localStorageKey, JSON.stringify(tagNav))
  window.localStorage.setItem(localStoragePathKey, JSON.stringify(tagNavRouter))
  return Object.assign({}, state, { tagNav, tagNavRouter })
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
    case actionTypes.DELETE_ALL_TAG:
      return deleteAllTag(state, action.data)
    case actionTypes.DELETE_OTHER_TAG:
      return deleteOtherTag(state)
    case actionTypes.DELETE_ONE_TAG:
      return deleteOneTag(state, action.data)
    case actionTypes.UPDATE_BREADCRUMB:
      return Object.assign({}, state, { breadcrumbList: action.data })
    default:
      return state
  }
}

export { settingReducer, actionTypes, actionCreators }
