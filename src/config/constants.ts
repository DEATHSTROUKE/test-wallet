import {
  type User,
  init,
  postEvent,
  retrieveLaunchParams,
  viewport,
} from '@telegram-apps/sdk'

class EnvConfig {
  papayaMasterAddress = 'kQCv-OaNLoPH796iqubWZPkR7ylQAXCfHit-WhlU7gHhWEP7'
  isDev = import.meta.env.DEV
  user: User | undefined = undefined
  token = ''

  constructor() {
    try {
      init()
      viewport.expand()

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

export const CARDS_DATA = [
  {
    id: 1,
    title: 'Support Kirill Malev',
    subtitle: '$1 daily contribution',
    amount: 1,
    subscribeBtnText: 'Subscribe $1/day',
    btnColor: 'redGradient',
  },
  {
    id: 2,
    title: 'Support UNICEF Daily',
    subtitle: '$1 daily for children in need',
    amount: 1,
    subscribeBtnText: 'UNICEF - $1/day',
    btnColor: 'blueGradient',
  },
  {
    id: 3,
    title: 'Support UNICEF Monthly',
    subtitle: '$30 monthly commitment',
    amount: 30,
    subscribeBtnText: 'Subscribe $30/month',
    btnColor: 'blueGradient',
  },
] as const
