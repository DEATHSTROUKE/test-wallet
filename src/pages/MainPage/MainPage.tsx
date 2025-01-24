import toast from 'react-hot-toast'

import { Header } from '@/components/header/header'
import { ConfirmDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { AlertsBlock } from './components/alerts-block'
import { Card } from './components/card'

export const MainPage = () => {
  const handleSubscribe = (plan: string) => {
    console.info(`Subscribing to: ${plan}`)
    toast.success(`Subscribed to: ${plan}`)
  }

  const handleUnsubscribe = (plan: string) => {
    console.info(`Unsubscribing from: ${plan}`)
    toast.success(`Unsubscribing to: ${plan}`)
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-6 pt-6">
        <div className="space-y-4">
          <Card
            title={'Support Kirill Malev'}
            subtitle={'$1 daily contribution'}
            actions={
              <div className="space-y-2">
                <ConfirmDialog
                  title={
                    'Are you sure you want to subscribe to Kirill Malev - $1/day?'
                  }
                  trigger={
                    <Button
                      variant={'redGradient'}
                      size={'md'}
                    >
                      Subscribe $1/day
                    </Button>
                  }
                  action={() => handleSubscribe('Kirill Malev - $1/day')}
                />

                <ConfirmDialog
                  title={
                    'Are you sure you want to unsubscribe to Kirill Malev - $1/day?'
                  }
                  trigger={
                    <Button
                      variant={'redGradient'}
                      size={'md'}
                      disabled
                    >
                      Unsubscribe
                    </Button>
                  }
                  action={() => handleUnsubscribe('Kirill Malev - $1/day')}
                />
              </div>
            }
          />

          <Card
            title={'Support UNICEF Daily'}
            subtitle={'$1 daily for children in need'}
            actions={
              <div className="space-y-2">
                <Button
                  variant={'blueGradient'}
                  size={'md'}
                  onClick={() => handleSubscribe('UNICEF - $1/day')}
                >
                  Subscribe $1/day
                </Button>
                <Button
                  variant={'blueGradient'}
                  size={'md'}
                  onClick={() => handleUnsubscribe('UNICEF - $1/day')}
                  disabled
                >
                  Unsubscribe
                </Button>
              </div>
            }
          />

          <Card
            title={'Support UNICEF Monthly'}
            subtitle={'$30 monthly commitment'}
            actions={
              <div className="space-y-2">
                <Button
                  variant={'blueGradient'}
                  size={'md'}
                  onClick={() => handleSubscribe('UNICEF - $30/month')}
                >
                  Subscribe $30/month
                </Button>
                <Button
                  variant={'blueGradient'}
                  size={'md'}
                  onClick={() => handleUnsubscribe('UNICEF - $30/month')}
                  disabled
                >
                  Unsubscribe
                </Button>
              </div>
            }
          />
        </div>

        <AlertsBlock />
      </main>
    </div>
  )
}
