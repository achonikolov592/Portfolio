'use client'
import {pinata} from "@/utils/pinata"
import { useEffect, useState } from 'react';

export default function ImageLanguage(){
    const [imageSrc, setImageSrc] = useState<string[]>([]);

    
    useEffect(()=>{
            const getIDs = async() =>{
                const response = await fetch("/api/language")

                if (response.ok){
                    const data = await response.json();
                    
                    let arrOfSRCs: Array<string> = []

                    for (let i = 0; i < data.length; i++){
                        const ids = await pinata.gateways.createSignedURL({
                            cid: data[i].cid,
                            expires: 30,
                            }).optimizeImage({
                                width:150,
                                height:150
                            })
                        arrOfSRCs = [...arrOfSRCs, ids]
                    }
                    setImageSrc(arrOfSRCs)

                }else{
                    console.error("Failed to fetch")
                }
            } 

            getIDs();
        }
        , []);
    return (
        <div className="inline-block mt-10">
            <div className="grid grid-cols-3 gap-4">
                {imageSrc.map((value, index) => (
                    <img key={index} src={value} alt="image" />
                ))}
            </div>
        </div>
    );
}