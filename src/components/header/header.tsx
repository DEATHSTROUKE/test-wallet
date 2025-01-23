import {
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react'
import { Wallet2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '../ui/button'

export const Header = () => {
  const { close, open, state } = useTonConnectModal()
  const wallet = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()

  console.info({ wallet })

  const handleWalletConnect = () => {
    toast.success('Wallet connected successfully')
  }

  const handleWalletDisconnect = () => {
    toast.promise(tonConnectUI.disconnect(), {
      loading: 'Disconnecting...',
      success: 'Wallet disconnected successfully',
      error: 'Error while disconnecting. Please try again',
    })
  }

  return (
    <header className="sticky z-50 top-0 bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Subscription Hub</h1>
        {wallet ? (
          <Button onClick={handleWalletDisconnect}>
            <Wallet2 className="w-4 h-4" />
            <span>Disconnect Wallet</span>
          </Button>
        ) : (
          <Button onClick={open}>
            <Wallet2 className="w-4 h-4" />
            <span>Connect Wallet</span>
          </Button>
        )}
      </div>
    </header>
  )
}
