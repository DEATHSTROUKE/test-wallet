import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Toaster } from 'react-hot-toast'

import { MainPage } from './pages/MainPage/MainPage'

export const App = () => {
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
