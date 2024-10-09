import {pinata} from "@/utils/pinata"
import { useEffect, useState } from 'react';
import getRows from "@/utils/getRows";

const ImageCertifications = async () => {
    //const [certificatesInfo, setCertificatesInfo] = useState<{name:string, description:string, url:string, date:Date}[]>([]);
    //const [isExpanded, setIsExpanded] = useState<boolean[]>([]);

    /*const toggleContent = (index:number) => {

        setIsExpanded(prevState => 
            prevState.map((element, i) => (i === index ? !element : element))
        );
    };*/
    
    let certificatesInfo:{name:string, description:string, url:string, date:Date}[] = []

    //useEffect(()=>{
            const getIDs = async() =>{
                const data = await getRows("Certifications");

                if (data){
                    let arrOfCertificates: Array<{name:string, description:string, url:string, date:Date}> = []
                    for (let i = 0; i < data.length; i++){
                        let certificate:{name:string, description:string, url:string, date:Date} = {name:"", description:"",url:"", date:new Date(Date.now())}
                        const url = await pinata.gateways.createSignedURL({
                            cid: data[i].cid,
                            expires: 30,
                            }).optimizeImage({
                                width:150,
                                height:150
                            })
                        
                        certificate.url = url
                        certificate.name = data[i].name
                        certificate.description = data[i].description
                        certificate.date = new Date(data[i].date)

                        arrOfCertificates = [...arrOfCertificates, certificate]
                    }
                    certificatesInfo = arrOfCertificates
                    //setIsExpanded(Array(arrOfCertificates.length).fill(false));

                }else{
                    console.error("Failed to fetch")
                }
            } 

            await getIDs();
        //}
        //, []);
    return (
        <div className="grid grid-cols-2 gap-1 w-3/4">
                {certificatesInfo.map((value, index) => (
                    <div key={index} className="flex bg-gray-50 rounded-lg border-double border-2 border-violet-600 p-2">
                        <div className="w-fit pr-2">
                            <img src={value.url} alt="image" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-violet-600">{value.name}</p>
                            <p>Date recieved: {value.date.toDateString()}</p>
                            
                                <div className="mt-2 w-72">
                                    <p>{value.description}</p>
                                </div>
                            
                            
                        </div>
                    </div>
                    
                ))}
                
        </div>
    );
}

export default ImageCertifications;