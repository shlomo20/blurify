
import React, { DOMElement, ReactNode, createElement, useEffect, useState } from 'react'
import './index.css'
import { ActionIcon, Button, Indicator, MantineProvider, Overlay, Text } from '@mantine/core';
import {MdOutlineVisibility,MdOutlineVisibilityOff} from 'react-icons/md'


const ContentScript = ({old, i}:{old?:HTMLImageElement, i:number}) => {
  const img = document.getElementsByTagName('img')
  const [element,setElement] = useState<ReactNode>()
  const [oldAt,setOldAt] = useState<{}>({})
  const[visible,setVisible] = useState<boolean>(false)

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

  useEffect(()=>{

    const NewEl = createElement(old.tagName.toLowerCase(), {
      ...oldAt,
      id:`blurify${i}`,
      children: old.innerHTML?old.innerHTML :undefined,
    })
    setElement(NewEl)
    
    // console.log(oldAt)
  },[oldAt])
  

  return (
    <MantineProvider>
      {/* {old.src}
      there are {img.length} */}
      {/* <img src={old.src}  srcSet={old.srcset} className={old.className} height={old.height} width={old.width} /> */}
      {/* {JSON.stringify({...oldAt})} */}
        {element}
        {!visible && (
          <Overlay style={{maxHeight: old.clientHeight ||old.height, maxWidth:old.clientWidth ||old.width,}} blur={15}  >
          </Overlay>
        )}
      <ActionIcon color="violet" size="xs" radius="xl" variant="filled" style={{zIndex:1000,position:'absolute',bottom:'3px', right:'3px'}} onClick={(e)=> {
          e.stopPropagation()
          e.preventDefault()
          setVisible(!visible)
        }}>
          {visible? <MdOutlineVisibilityOff/>:<MdOutlineVisibility/>}
        </ActionIcon>
    </MantineProvider>
  );
}

export default ContentScript