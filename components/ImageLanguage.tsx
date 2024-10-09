
import {pinata} from "@/utils/pinata"
//import { useEffect, useState } from 'react';
import getRows from "@/utils/getRows";

const ImageLanguage = async () =>{
    const data = await getRows("Languages");

    if (data){
        
        
        const imageSrc = await Promise.all(
            data.map(async (item) => {
                const url = await pinata.gateways.createSignedURL({
                    cid: item.cid,
                    expires: 30,
                }).optimizeImage({
                    width: 150,
                    height: 150,
                });
                return url;
            })
        );

        return (
            <div className="inline-block mt-10">
                <div className="grid grid-cols-3 gap-4">
                    {imageSrc.map((value, index) => (
                        <img key={index} src={value} alt="image" />
                    ))}
                </div>
            </div>
        );

    }else{
        console.error("No response from the db")
        return (
            <div className="inline-block mt-10">
                No languages to show.
            </div>
        );
    }
    
}

export default  ImageLanguage;