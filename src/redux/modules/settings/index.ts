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
  const TagsNav: actionTypes.TagNavConfig[] = JSON.parse(window.localStorage.getItem(
    'zh_tag_page'
  ) as string)
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

const deleteAllTag = (state: actionTypes.SettingState, data: actionTypes.SetTagsNavOptions) => {
  console.log(state, data)
  return state
}

const deleteOtherTag = (state: actionTypes.SettingState, data: actionTypes.SetTagsNavOptions) => {
  console.log(state, data)
  return state
}

const deleteOneTag = (state: actionTypes.SettingState, data: actionTypes.SetTagsNavOptions) => {
  console.log(state, data)
  return state
}

// // 删除全部
// const deleteAllTag = (state, history) => {
//   history && history.push('/app')

//   const initTagPage = [homePathConfig]
//   const initTagPath = ['/app']

//   window.localStorage.setItem('zh_tag_page', JSON.stringify(initTagPage))
//   window.localStorage.setItem('zh_tag_path', JSON.stringify(initTagPath))
//   return Object.assign({}, state, {tagPage: initTagPage, tagPageRouter: initTagPath})
// }

// // 删除其他
// const deleteOtherTag = (state) => {
//   let {tagPage} = JSON.parse(JSON.stringify(state))

//   let tagPageRouter = []

//   tagPage = tagPage.filter(item => {
//     if (item.color !== 'default' || item.path === '/app') {
//       tagPageRouter.push(item.path)
//       return true
//     } else {
//       return false
//     }
//   })

//   window.localStorage.setItem('zh_tag_page', JSON.stringify(tagPage))
//   window.localStorage.setItem('zh_tag_path', JSON.stringify(tagPageRouter))
//   return Object.assign({}, state, {tagPage, tagPageRouter})
// }

// // 删除一个
// const deleteOneTag = (state, params) => {
//   let {tagPage, tagPageRouter} = JSON.parse(JSON.stringify(state))
//   const currentIndex = tagPageRouter.indexOf(params.currentTagMessage.path)

//   if (params.currentTagMessage.color === 'primary') {
//     params.history.push(tagPageRouter[currentIndex - 1])
//   }


//   tagPage.splice(currentIndex, 1)
//   tagPageRouter.splice(currentIndex, 1)

//   window.localStorage.setItem('zh_tag_page', JSON.stringify(tagPage))
//   window.localStorage.setItem('zh_tag_path', JSON.stringify(tagPageRouter))
//   return Object.assign({}, state, {tagPage, tagPageRouter})
// }

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
      return deleteOtherTag(state, action.data)
    case actionTypes.DELETE_ONE_TAG:
      return deleteOneTag(state, action.data)
    default:
      return state
  }
}

export { settingReducer, actionTypes, actionCreators }
