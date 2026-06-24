import React from 'react'
import { Star, ExternalLink } from 'lucide-react'

const googleUrl = 'https://www.google.com/search?q=Neoskills+Learning+Solutions&oq=neoski'

const GoogleReviews = ({ compact = false }) => {
  return (
    <a
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all ${
        compact ? 'px-3 py-1.5' : 'px-4 py-2.5'
      }`}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={compact ? 12 : 14}
            className={star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400'}
          />
        ))}
      </div>
      <span className={`font-semibold text-gray-800 ${compact ? 'text-xs' : 'text-sm'}`}>4.7</span>
      <span className={`text-gray-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>
        (2,500+ reviews)
      </span>
      <ExternalLink size={compact ? 10 : 12} className="text-primary shrink-0" />
    </a>
  )
}

export default GoogleReviews
