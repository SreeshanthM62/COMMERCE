import React from 'react'

const Alert = () => {
  return (
    <div className='w-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-medium py-2 px-4 text-center border-b border-pink-200 sticky top-0 z-50 transition-all'>
     <p>
      THE WEBSITE IS COMING SOON✨. FOR NOW PLEASE ORDER THROUGH  
      <a
        href = 'https://ig.me/m/_twistnbloom.co'
        target = '_blank'
        rel = 'noopener noreferrer'
        className='underline font-bold hover:text-pink-900 inline-flex items-center gap-1'>
        Instagram DM 💌
      </a>
     </p>
    </div>
  )
}

export default Alert
