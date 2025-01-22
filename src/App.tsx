import { init, viewport } from '@telegram-apps/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { MainPage } from './pages/MainPage/MainPage'

export const App = () => {
  useEffect(() => {
    init()
    viewport.expand()
  }, [])

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: '#1e293b',
            color: 'white',
          },
        }}
      />
      <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
        <MainPage />
      </TonConnectUIProvider>
    </div>
  )
}
