// import { Group, ScrollArea, Table, Text, ActionIcon, } from '@mantine/core'
// import { useLocalStorage } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import {TbTrash} from 'react-icons/tb'

const UrlList = ({storeKey,columnName}:{storeKey:string,columnName:string  }) => {
    const [urlList, setUrlList] =  useState<string[]>()
    const [refresh, setRefresh] = useState<boolean>(true)
    
    const handelDeleteUrl= async (item:string)=>{
        const b = urlList.filter((url)=> url!== item)
        console.log('storeKey',storeKey,'item',item,'foilter', b)
        const a = await chrome.storage.local.set({ [storeKey] :b })
        console.log(await a)
    }

    useEffect(()=>{
        if(refresh){
            const getUrls = async ()=>{
                const localData = await chrome.storage.local.get(storeKey)
                console.log('localData' , localData[storeKey])
                if(localData[storeKey]) setUrlList([...localData[storeKey]])
                setRefresh(false)
            }
            getUrls() 
        }
    },[refresh])

    useEffect(()=>{
        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                // console.log(
                //     `Storage key "${key}" in namespace "${namespace}" changed.`,
                //     `Old value was "${oldValue}", new value is "${newValue}".`
                //   );
                if(key === storeKey) setRefresh(true)
            }
          });
    },[])



    const rows = urlList?.map((item,i) => (
        <tr key={i}>
            <td>
            <div >
                <p >
                {item}
                </p>
            </div>
            </td>

            <td>
                <div>
                {/* <ActionIcon>
                    <IconPencil size="1rem" stroke={1.5} />
                </ActionIcon> */}
                <button className='btn btn-sm text-red-700 btn-ghost btn-circle' onClick={()=>handelDeleteUrl(item)}>
                    <TbTrash/>
                </button>
                </div>
            </td>
        </tr>
    ))

    return (
        <div className="overflow-x-auto">
          <table className="table" >
            <thead>
              <tr>
                <th>{columnName.charAt(0).toUpperCase()}{columnName.slice(1) }</th>
                <th />
              </tr>
            </thead>
            {urlList?.length > 0 &&
                <tbody>{rows}</tbody>
            }
            {urlList?.length <= 0 &&
                <tr> <td><div>You don't have any urls saved...</div></td></tr>
            }
          </table>
        </div>
    )
}

export default UrlList