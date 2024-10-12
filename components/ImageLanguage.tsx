'use client'
import {pinata} from "@/utils/pinata"
import { useEffect, useState } from 'react';
import getRows from "@/utils/getRows";

export default function ImageLanguage(){
    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const [session, setSession] = useState(null)

    
    useEffect(()=>{
        const getIDs = async() =>{
            const data = await getRows("Languages");
            if (data) {
                let arrOfSRCs: Array<string> = [];

                // Fetch images
                for (let i = 0; i < data.length; i++) {
                    const ids = await pinata.gateways.createSignedURL({
                        cid: data[i].cid,
                        expires: 30,
                    }).optimizeImage({
                        width: 150,
                        height: 150,
                    });
                    arrOfSRCs.push(ids); // Use push for better performance
                }
                setImageSrc(arrOfSRCs);
            } else {
                console.error("No response from the db");
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