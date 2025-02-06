import { useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react'
import { Wallet2 } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useContract } from '@/hooks/use-contract'
import { useTonClient } from '@/hooks/use-ton-client'
import { useTonConnect } from '@/hooks/use-ton-connect'

import { ConfirmDialog } from '../ui/alert-dialog'
import { Button } from '../ui/button'

export const Header = () => {
  const { open } = useTonConnectModal()
  const { wallet } = useTonConnect()
  const [tonConnectUI] = useTonConnectUI()

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
          <ConfirmDialog
            title={'Are you sure you want to disconnect your wallet?'}
            trigger={
              <Button onClick={handleWalletDisconnect}>
                <Wallet2 className="w-4 h-4" />
                <span>Disconnect Wallet</span>
              </Button>
            }
            action={handleWalletDisconnect}
          />
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
