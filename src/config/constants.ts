import {
  type User,
  init,
  postEvent,
  retrieveLaunchParams,
} from '@telegram-apps/sdk'

import CoinIcon from '@/assets/interface/coin.webp'

class EnvConfig {
  usersApiUrl: string = import.meta.env.VITE_USERS_API_URL
  isDev = import.meta.env.DEV
  user: User | undefined = undefined
  token = ''

  constructor() {
    try {
      init()
      const TG_PARAMS = retrieveLaunchParams()
      this.user = TG_PARAMS.initData?.user
      this.token = TG_PARAMS?.initDataRaw || ''
    } catch (e) {
      console.error(e)
    }
  }
}

export const envConfig = new EnvConfig()

try {
  postEvent('web_app_set_header_color', {
    color: '#1e293b',
  })
} catch (e) {
  console.info(e)
}

export const CURRENCY_IMAGES = {
  soft: CoinIcon,
}
