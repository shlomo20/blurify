
import React, { useEffect, useState } from 'react'
import UrlList from './urlList';

const TabHandler = () => {
    const [currentTabInfo, setCurrentTabInfo] = useState<chrome.tabs.Tab>()
    const [pageSpasticUrl,setPageSpasticUrl] = useState<string>('')
    const [mainUrl,setMainUrl] = useState<string>('')
    const [openSites, setOpenSites] = useState<string[]>()
    const [refresh, setRefresh] = useState<boolean>(true)
    
    const addSite = async() => {
        const b = openSites?.filter((url)=> mainUrl === url)
        if(b?.length> 0) {
            
            alert(`${b[0]} already exists`)
            return
        }
        const a = openSites? [...openSites,mainUrl]: [mainUrl]
        console.log('a', a)
         await chrome.storage.local.set({ 'open-sites': a })
    }

    const [openPages, setOpenPages] = useState<string[]>()

        
    const addPage =  async() => {
        const b = openPages?.filter((url)=> pageSpasticUrl === url)
        if(b?.length> 0) {
            alert(`${b[0]} already exists`)
            return
        }
        const a = openPages? [...openPages,pageSpasticUrl]: [pageSpasticUrl]
        console.log('b', a)
        await chrome.storage.local.set({'open-pages': a })
   }

    const clearAll =()=> {
        chrome.storage.local.clear()
    }
   
    useEffect(()=>{
        var query = { active: true, currentWindow: true };
        function callback(tabs: chrome.tabs.Tab[]) {
            var currentTab = tabs[0]; // there will be only one in this array
            console.log('currentTab',currentTab);
            setCurrentTabInfo(currentTab); // also has properties like currentTab.id
        }
        chrome.tabs.query(query, callback);
    },[])

    useEffect(()=>{
        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                console.log(
                    `Storage key "${key}" in namespace "${namespace}" changed.`,
                    `Old value was "${oldValue}", new value is "${newValue}".`
                  );
                console.log('refresh should be called ')
                if(key ==='open-sites' || key === 'open-pages') setRefresh(true)
            }
          });
    },[])

    useEffect(() => {
        if(refresh){
            const getUrls = async ()=>{
                const localData = await chrome.storage.local.get(['open-sites', 'open-pages',])
                setOpenSites(localData['open-sites'])
                setOpenPages(localData['open-pages'])
                setRefresh(false)
            }
            getUrls()
        }
    }, [refresh])
    
    useEffect(()=>{
        setMainUrl(currentTabInfo?.url.match(/https:\/\/([^/]+)/g )[0])
        setPageSpasticUrl(currentTabInfo?.url.split('?')[0])
    },[currentTabInfo])

    return (
        <div className=''>
            <div className='flex flex-row justify-around'>
                <button className='btn btn-sm btn-outline btn-secondary' onClick={()=>addPage()}>
                    add this page 
                </button>
                <button className='btn btn-sm btn-outline ' onClick={()=> addSite()}>
                    add this site 
                </button>
            </div>
            <div> 
                <UrlList storeKey='open-sites' columnName='Sites'/>
                <UrlList  storeKey='open-pages' columnName='Pages'/>
            </div>
            <div className='h-12 w-8'></div>
            <button className='btn btn-sm btn-outline btn-warning absolute bottom-3 right-3 ' onClick={()=> clearAll()}>
                clear all 
            </button>

        </div>
    )
}

export default TabHandler