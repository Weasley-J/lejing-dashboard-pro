import { create } from 'zustand'
import { log } from '@/common/loggerProvider.ts'
import { isDebugEnable } from '@/common/debugProvider.ts'
import { User } from '@/types/apiTypes.ts'
import storageUtils from '@/utils/storageUtils.ts'

/**
 * This is the store for the app. implemented using Zustand library.
 */
const useZustandStore = create<{
  /* state */
  token: string
  userInfo: User.Information
  collapsed: boolean
  isDarkEnable: boolean
  /* setters */
  setToken: (token: string) => void
  setUserInfo: (userInfo: User.Information) => void
  setCollapsed: () => void
  setDarkEnable: () => void
}>(set => ({
  /* state */
  token: '',
  userInfo: {} as User.Information,
  collapsed: false,
  isDarkEnable: false,
  /* setters */
  setToken: (token: string) => set(() => ({ token })),
  setUserInfo: (userInfo: User.Information) => {
    set(() => ({ userInfo }))
    logUpdate(userInfo) // Call logUpdate after setting userInfo
  },
  setCollapsed: () => {
    set(state => {
      const collapsed = state.collapsed
      logUpdate(collapsed)
      return { collapsed: !collapsed }
    })
  },
  setDarkEnable: () => {
    set(state => {
      const enable = !state.isDarkEnable
      logUpdate(enable)
      storageUtils.set('darkEnable', enable)
      return { isDarkEnable: enable }
    })
  },
}))

function logUpdate(data: any) {
  if (isDebugEnable) log.debug('Zustand meta data update:', data)
}

export default useZustandStore
