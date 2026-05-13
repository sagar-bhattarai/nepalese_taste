"use client"
import { useState, useEffect } from 'react'
import { CiCircleChevUp } from "react-icons/ci";

const ScrollToTop = () => {
    const [showGoTop, setShowGoTop] = useState(false)

    const handleVisibleButton = () => {
        setShowGoTop(window.pageYOffset > 50)
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton)
    }, [])

    return (
        <div className={showGoTop ? 'fixed bottom-20 left-4 md:left-8 z-50 w-max'  : 'hidden' } onClick={handleScrollUp}>
            <button type='button' title="scroll to top"> <CiCircleChevUp className='h-8 w-8 hover:scale-90 text-gray-300 hover:text-gray-400 cursor-pointer bg-primary rounded-full' /></button>
        </div>
    )

}

export default ScrollToTop