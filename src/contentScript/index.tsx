import React from 'react'
import { createRoot } from 'react-dom/client'
import ContentScript from './contentScript'

function a(){
    const img = document.getElementsByTagName('img')
    const arrayImages = Array.from(img)

    arrayImages.map((image,i)=>{
        // console.log(i, ': ', image)
        if(image.clientWidth > 25 && image.clientHeight > 25){
            const newEl = document.createElement('div')
            // image.parentNode.insertBefore(newEl,image)
            image.parentNode.appendChild(newEl)
            image.parentNode.removeChild(image)
            const root =  createRoot(newEl)

            root.render(<ContentScript  old={image} />)
            // image.parentNode.replaceChild(image ,newEl)
            // image.className ='test'
        }  
    })

    // const app = document.createElement('div')

    // const app = document.getElementsByTagName('body')[0]
    // const oldBody = document.body
    // document.body.replaceChildren()



    // document.body.prepend(app)
    // console.log('yesy')

    // const root =  createRoot(app)

    // root.render(<ContentScript   />)
}

a()