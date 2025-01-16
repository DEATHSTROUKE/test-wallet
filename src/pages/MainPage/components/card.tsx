import { Heart } from 'lucide-react'

export const Card = ({
  title,
  subtitle,
  actions,
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
  actions: React.ReactNode
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>
        <Heart className="w-6 h-6 text-pink-500" />
      </div>
      {actions}
    </div>
  )
}
