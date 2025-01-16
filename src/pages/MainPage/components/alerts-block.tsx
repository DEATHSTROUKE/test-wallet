import { AlertCircle } from 'lucide-react'

export const AlertsBlock = () => {
  return (
    <div className="mt-8 space-y-4">
      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400">
            The team just donates the UNICEF proceeds to UNICEF, and Kirill
            Malev gets his donation directly to his wallet.
          </p>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400">
            <span className="text-amber-400 font-medium">Important:</span> You
            are responsible for managing and cancelling your own subscriptions.
            Please ensure you keep track of your active subscriptions and cancel
            them when needed.
          </p>
        </div>
      </div>
    </div>
  )
}
