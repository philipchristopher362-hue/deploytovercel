import { Button } from '@nextui-org/button'
import React from 'react'

function LastPage({ lesson }: { lesson?: { title?: string; summary?: string } }) {
  return (
    <div className='bg-primary p-10 h-full flex flex-col items-center justify-center gap-6'>
      <h2 className='text-center text-3xl font-bold text-white'>
        {lesson?.title ?? 'Lesson Learned'}
      </h2>
      <p className='text-white text-lg text-center leading-relaxed'>
        {lesson?.summary ?? ''}
      </p>
      <div className='w-16 h-1 bg-white rounded-full opacity-50' />
      <span className='text-white text-xl font-semibold opacity-80'>The End</span>
      <Button color='default' variant='bordered' className='text-white border-white mt-2'>
        Share
      </Button>
    </div>
  )
}

export default LastPage
