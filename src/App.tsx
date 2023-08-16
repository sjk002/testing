import { useState, useEffect, useRef, MutableRefObject } from 'react'
import './App.css'

export default function App() {

  const boxRef = useRef() as MutableRefObject<HTMLDivElement>
  const [screenSize, setScreenSize] = useState({width: 0, height: 0})

  function getCurrentDimension() {
    return {
      width: boxRef.current.offsetWidth,
      height: boxRef.current.offsetHeight
    }
  }

  /* function handleScroll(event: { target: any; deltaY: any }) {
    const container = event.target 
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + event.deltaY,
      behavior: 'smooth'
    })
  } */

  useEffect(() => {

    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension)

    return(() => {
      window.removeEventListener('resize', updateDimension)
    })
  }, [screenSize])

  useEffect(() => {
    setScreenSize(getCurrentDimension())

    const scrollContainer = document.querySelector('main')
    scrollContainer?.addEventListener('wheel', (evt) => {
      scrollContainer.scrollLeft -= evt.deltaY
    })
  }, [])

  return (
    <main>
      <div className='page'>
        <div ref={boxRef} className='box'></div>
        <p>hello</p>
        <p>{screenSize.height}, {screenSize.width}</p>
      </div>
      <div className="page yellow">
        
      </div>
    </main>
  )
}