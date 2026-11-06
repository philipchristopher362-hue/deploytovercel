import Image from 'next/image'
import React from 'react'

function BookCoverPage({imageUrl}:any) {
  // Use local cover when no real image is available
  const src = (!imageUrl || imageUrl.includes('placeholder'))
    ? '/bookcover2.jpg'
    : imageUrl;

  return (
    <div>
        <Image 
          src={src} 
          alt='cover' 
          width={500} 
          height={500}
          className='object-cover h-[500px] w-[500px]'
        />
    </div>
  )
}

export default BookCoverPage
