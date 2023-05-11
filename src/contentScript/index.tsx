import React from 'react'
import { createRoot } from 'react-dom/client'
import ContentScript from './contentScript'

async function a(){
    const images = document.getElementsByTagName('img')
    const arrayImages = Array.from(images)
    const urls = await chrome.storage.local.get(['open-sites','open-pages'])
    const mainUrl = window.location.origin 
    const pageUrl = window.location.href.split('?')[0]
    
    // console.log('window.location',  pageUrl)
    // console.log('urls',  urls)        
    const openSites = urls['open-sites']
    const openPages = urls['open-pages']

    const openSitesFiltered = openSites?.filter((url)=> mainUrl === url)
    const openPagesFiltered = openPages?.filter((url)=>  pageUrl === url)

    if(openPagesFiltered?.length > 0 || openSitesFiltered?.length > 0 ){
        return
    }

     arrayImages.map( (image,i)=>{
        // console.log(i, ': ', image)
        if(image.clientWidth > 25 && image.clientHeight > 25 && !image.id.startsWith('blurify')  ){
            const newEl = document.createElement('div')
            // image.parentNode.insertBefore(newEl,image)
            image.parentNode.appendChild(newEl)
            image.parentNode.removeChild(image)
            const root =  createRoot(newEl)

            root.render(<ContentScript  old={image} i={i} />)
            // image.parentNode.replaceChild(image ,newEl)
            // image.className ='test'
        }  
        if(arrayImages.length ==i ){
            return 'done'
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


window.onload = async (event) => {
    await a()
    b()
};

function b(){
    
    const googleImageTab = document.getElementsByTagName('body')[0]
    console.log("googleImageTab: ",googleImageTab)

    function callback(mutationList) {
        mutationList.forEach((mutation) => {
        switch (mutation.type) {
            case "childList":
                console.log('mutation')
                a()
            break;
            case "attributes":
            /* An attribute value changed on the element in
                mutation.target.
                The attribute name is in mutation.attributeName, and
                its previous value is in mutation.oldValue. */
            break;
        }
        });
    }

    const observerOptions = {
    childList: true,
    attributes: true,

    // Omit (or set to false) to observe only changes to the parent node
    subtree: true,
    };

    const observer = new MutationObserver(callback);
    observer.observe(googleImageTab, observerOptions);
}

