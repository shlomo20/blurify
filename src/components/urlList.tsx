import { Group, ScrollArea, Table, Text, ActionIcon, } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks';
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
            <Group spacing="sm">
                <Text fz="sm" fw={500}>
                {item}
                </Text>
            </Group>
            </td>

            <td>
                <Group spacing={0} position="right">
                {/* <ActionIcon>
                    <IconPencil size="1rem" stroke={1.5} />
                </ActionIcon> */}
                <ActionIcon color="red" onClick={()=>handelDeleteUrl(item)}>
                    <TbTrash/>
                </ActionIcon>
                </Group>
            </td>
        </tr>
    ))

    return (
        <ScrollArea>
          <Table sx={{ minWidth: 300,maxWidth: 300 }} verticalSpacing="sm">
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
                <div>You don't have any urls saved...</div>
            }
          </Table>
        </ScrollArea>
    )
}

export default UrlList