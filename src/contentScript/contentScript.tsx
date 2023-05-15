
import React, { DOMElement, ReactNode, createElement, useEffect, useState } from 'react'
import './index.css'
// import { ActionIcon, Button, Indicator, MantineProvider, Overlay, Text } from '@mantine/core';
import {MdOutlineVisibility,MdOutlineVisibilityOff} from 'react-icons/md'


const ContentScript = ({old, i}:{old?:HTMLImageElement, i:number}) => {
  const img = document.getElementsByTagName('img')
  const [element,setElement] = useState<ReactNode>()
  const [oldAt,setOldAt] = useState< {[x: string]: string;}>({})
  const[visible,setVisible] = useState<boolean>(false)
  const [blur,setBlur] = useState<boolean>(true)

  useEffect(()=>{
  
    for (const attr of old.attributes) {
      const av = {
        [attr.name] :attr.value
      }
      setOldAt((prev) =>  {
        return {...prev,...av}
      })
    }
  },[old])

  
  console.log('visible', visible)
  return (
    <>
      {/* {old.src} there are {img.length} */}
      {/* <img src={old.src}  srcSet={old.srcset} className={old.className} height={old.height} width={old.width} /> */}
      {/* {JSON.stringify({...oldAt})} */}
      {/* <div className={`${!visible? 'blur-xl':'blur-0'}`}> */}

      <img {...oldAt}  children={old.innerHTML?old.innerHTML :undefined} className={  visible? `blur-0 ${oldAt?.class}` :`blur-xl ${oldAt?.class}` } id={`blurify${i} ${oldAt?.id}`} /> 
      <div className='absolute inset-x-0 bottom-2.5 z-10 flex justify-center'>
        <button color="violet" className='w-3 h-3 bg-violet-700 rounded-full text-black'  onClick={(e)=> {
          e.stopPropagation()
          e.preventDefault()
          setVisible(!visible)
        }}>
        {visible? <MdOutlineVisibilityOff className='w-3 h-3' size={'1em'} />:<MdOutlineVisibility className='w-3 h-3'  size={'1em'} />}
      </button>
      </div>
      {/* </div> */}
    </>
  );
}

export default ContentScript