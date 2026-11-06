"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage'
import StoryPages from '../_components/StoryPages'
import LastPage from '../_components/LastPage'
import { Button } from '@nextui-org/button'
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

function ViewStory({ params }) {

  const [story, setStory] = useState();
  const bookRef = useRef();
  const [count, setCount] = useState(0);

  // Responsive book size
  const [bookSize, setBookSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    getStory();
    updateBookSize();
    window.addEventListener('resize', updateBookSize);
    return () => window.removeEventListener('resize', updateBookSize);
  }, [])

  const updateBookSize = () => {
    const w = window.innerWidth;
    if (w < 480) {
      setBookSize({ width: w - 48, height: w - 48 });
    } else if (w < 768) {
      setBookSize({ width: 380, height: 380 });
    } else {
      setBookSize({ width: 500, height: 500 });
    }
  }

  const getStory = async () => {
    const result = await db.select().from(StoryData)
      .where(eq(StoryData.storyId, params.id));
    console.log(result[0]);
    setStory(result[0]);
  }

  return (
    <div className='p-6 md:p-10 md:px-20 lg:px-40 flex justify-center flex-col'>
      <h2 className='font-bold text-2xl md:text-4xl text-center p-6 md:p-10 bg-primary text-white'>
        {story?.output?.story_cover?.title}
      </h2>

      {story && (
        <div className='relative flex justify-center mt-6'>
          {/* @ts-ignore */}
          <HTMLFlipBook
            width={bookSize.width}
            height={bookSize.height}
            showCover={true}
            className='mt-4'
            useMouseEvents={false}
            ref={bookRef}
          >
            <div>
              <BookCoverPage imageUrl={story?.coverImage} />
            </div>
            {story.output?.chapters?.map((chapter, index) => (
              <div key={index} className='bg-white p-5 md:p-10 border h-full overflow-auto'>
                <StoryPages storyChapter={chapter} />
              </div>
            ))}
            <div>
              <LastPage lesson={story.output?.lesson} />
            </div>
          </HTMLFlipBook>

          {count != 0 && (
            <div
              className='absolute -left-4 md:-left-5 top-[45%] cursor-pointer'
              onClick={() => {
                bookRef.current.pageFlip().flipPrev();
                setCount(count - 1);
              }}
            >
              <IoIosArrowDropleftCircle className='text-[35px] md:text-[40px] text-primary' />
            </div>
          )}

          {count != (story?.output?.chapters?.length) && (
            <div
              className='absolute -right-4 md:right-0 top-[45%] cursor-pointer'
              onClick={() => {
                bookRef.current.pageFlip().flipNext();
                setCount(count + 1);
              }}
            >
              <IoIosArrowDroprightCircle className='text-[35px] md:text-[40px] text-primary' />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewStory
