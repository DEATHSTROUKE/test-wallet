import { cloudStorage, init } from '@telegram-apps/sdk'
import { useLayoutEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Header } from '@/components/header/header'
import { ConfirmDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { AlertsBlock } from './components/alerts-block'
import { Card } from './components/card'

const CARDS_DATA = [
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

export const MainPage = () => {
  const [activeCards, setActiveCards] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    init()
    cloudStorage.getItem('activeCards').then(data => {
      console.info(data)
      if (data) {
        console.info(JSON.parse(data))
        setActiveCards(JSON.parse(data))
        setIsLoading(false)
      }
    })
  }, [])

  const handleSubscribe = (cardId: number) => {
    const newActiveCards = [...activeCards, cardId]
    setActiveCards(newActiveCards)
    cloudStorage.setItem('activeCards', JSON.stringify(newActiveCards))

    console.info(
      `Subscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
    toast.success(
      `Subscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
  }

  const handleUnsubscribe = (cardId: number) => {
    const newActiveCards = activeCards.filter(card => card !== cardId)
    setActiveCards(newActiveCards)
    cloudStorage.setItem('activeCards', JSON.stringify(newActiveCards))

    console.info(
      `Unsubscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
    toast.success(
      `Unsubscribed to ${CARDS_DATA.find(card => card.id === cardId)?.title}`
    )
  }

  console.info({ activeCards }, activeCards.includes(1))

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-6 pt-6">
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
