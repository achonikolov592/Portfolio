import { pinata } from "@/utils/pinata"; // Import Pinata utilities
import getRows from "@/utils/getRows"; // Import your database access function

const ImageLanguage = async () => {
    // Fetch data from the database directly
    const data = await getRows("Languages");

    // Check if data is available
    if (!data) {
        console.error("No response from the database");
        return <div>No data available</div>; // Handle the case of no data
    }

    // Map through the data to create signed URLs
    const imageSrc = await Promise.all(
        data.map(async (item) => {
            const url = await pinata.gateways.createSignedURL({
                cid: item.cid,
                expires: 30,
            }).optimizeImage({
                width: 150,
                height: 150,
            });
            return url; // Return the generated URL
        })
    );

    // Return the JSX to render images
    return (
        <div className="inline-block mt-10">
            <div className="grid grid-cols-3 gap-4">
                {imageSrc.map((value, index) => (
                    <img key={index} src={value} alt="image" />
                ))}
            </div>
        </div>
    );
};

export default ImageLanguage;