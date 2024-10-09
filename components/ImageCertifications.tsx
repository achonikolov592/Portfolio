import {pinata} from "@/utils/pinata"
import getRows from "@/utils/getRows";

const ImageCertifications = async () => {
    const data = await getRows("Certifications");

    if (data){

        const certificatesInfo = await Promise.all(
            data.map(async (item) => {
                const url = await pinata.gateways.createSignedURL({
                    cid: item.cid,
                    expires: 30,
                }).optimizeImage({
                    width: 150,
                    height: 150,
                });
                return {
                    name: item.name,
                    description: item.description,
                    url: url,
                    date: new Date(item.date),
                };
            })
        );
    
        return (
            <div className="grid grid-cols-2 gap-1 w-3/4">
                {certificatesInfo.map((value, index) => (
                    <div key={index} className="flex bg-gray-50 rounded-lg border-double border-2 border-violet-600 p-2">
                        <div className="w-fit pr-2">
                            <img src={value.url} alt="Certificate Image" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-violet-600">{value.name}</p>
                            <p>Date received: {value.date.toDateString()}</p>
                            <div className="mt-2 w-72">
                                <p>{value.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

    }else{
        console.error("Failed to fetch")
        return (
            <div className="grid grid-cols-2 gap-1 w-3/4">
                No sertifications to show.
            </div>
        );
    }
}

export default ImageCertifications;