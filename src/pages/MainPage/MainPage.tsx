import { Opcodes } from '@/ton/wrappers/PapayaMaster'
import { cloudStorage } from '@telegram-apps/sdk'
import { Address } from '@ton/core'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Header } from '@/components/header/header'
import { ConfirmDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { CARDS_DATA, envConfig } from '@/config/constants'

import { useContract } from '@/hooks/use-contract'
import { useTonConnect } from '@/hooks/use-ton-connect'

import { AlertsBlock } from './components/alerts-block'
import { Card } from './components/card'

export const MainPage = () => {
  const [activeCards, setActiveCards] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { getWalletData, initJettonWallet } = useContract()

  const triggerSmartContract = async () => {
    await getWalletData()
  }

  const deployContract = async () => {
    await initJettonWallet()
  }

  useEffect(() => {
    cloudStorage.getItem('activeCards').then(data => {
      if (data) {
        setActiveCards(JSON.parse(data))
      }
      setIsLoading(false)
    })
  }, [])

  const handleSubscribe = (cardId: number) => {
    const newActiveCards = [...activeCards, cardId]
    setActiveCards(newActiveCards)
    cloudStorage.setItem('activeCards', JSON.stringify(newActiveCards))

    toast.success(
      `Subscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
  }

  const handleUnsubscribe = (cardId: number) => {
    const newActiveCards = activeCards.filter(card => card !== cardId)
    setActiveCards(newActiveCards)
    cloudStorage.setItem('activeCards', JSON.stringify(newActiveCards))

    toast.success(
      `Unsubscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-6 pt-6">
        <div className="flex flex-col space-y-4 items-start">
          <Button onClick={triggerSmartContract}>Trigger Smart Contract</Button>
          <Button onClick={deployContract}>Deploy contract</Button>
        </div>
        <div className="space-y-4">
          {CARDS_DATA.map(card => {
            return (
              <Card
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                actions={
                  !isLoading ? (
                    <div className="space-y-2">
                      <ConfirmDialog
                        title={`Are you sure you want to subscribe to ${card.title}?`}
                        trigger={
                          <Button
                            variant={card.btnColor}
                            size={'md'}
                            disabled={activeCards.includes(card.id)}
                          >
                            {card.subscribeBtnText}
                          </Button>
                        }
                        action={() => handleSubscribe(card.id)}
                      />

                      <ConfirmDialog
                        title={`Are you sure you want to unsubscribe from ${card.title}?`}
                        trigger={
                          <Button
                            variant={'redGradient'}
                            size={'md'}
                            disabled={!activeCards.includes(card.id)}
                          >
                            Unsubscribe
                          </Button>
                        }
                        action={() => handleUnsubscribe(card.id)}
                      />
                    </div>
                  ) : (
                    <>Loading...</>
                  )
                }
              />
            )
          })}
        </div>

        <AlertsBlock />
      </main>
    </div>
  )
}
