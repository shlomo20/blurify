// chrome.runtime.sendMessage('I am loading content script', (response) => {
//     console.log(response);
//     console.log('I am content script')

// })

// window.onload = (event) => {
//     console.log('page is fully loaded');
// };


import React, { DOMElement, ReactNode, createElement, useEffect, useState } from 'react'
import './index.css'
import { ActionIcon, Button, Indicator, MantineProvider, Overlay, Text } from '@mantine/core';
import {MdOutlineVisibility,MdOutlineVisibilityOff} from 'react-icons/md'


const ContentScript = ({old}:{old?:HTMLImageElement}) => {
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
        <Overlay blur={15} center>
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