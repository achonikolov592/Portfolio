
import {pinata} from "@/utils/pinata"
//import { useEffect, useState } from 'react';
import getRows from "@/utils/getRows";

const ImageLanguage = async () =>{
    //const [imageSrc, setImageSrc] = useState<string[]>([]);

    let imageSrc: string[] = []
    //useEffect(()=>{
            //const getIDs = async() =>{
                const data = await getRows("Languages");

                if (data){
                    
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
                    imageSrc = arrOfSRCs

                }else{
                    console.error("No response from the db")
                }
           // } 

            //await getIDs();
        //}
        //, []);
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

export default  ImageLanguage;