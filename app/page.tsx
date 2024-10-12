import Image from "next/image";
import CalculateAge from "@/utils/calculateAge";
import ImageLanguage from "@/components/ImageLanguage";
import ImageCertifications from "@/components/ImageCertifications";
import GitHubProjects from "@/components/GitHubProjects";


export default function HomePage() {
  const Age: number|undefined = CalculateAge()
  
  return (
    <div>
        <div id="bio" className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center bg-gray-50 h-16 w-9/12 rounded-lg mb-10">
                <h1 className="text-violet-600 text-2xl font-sans">BIO</h1>
              </div>
            <div className="flex mb-10 w-9/12">
              <div id="pictureOfMyself" className="mr-28">
                  <Image src="/me.jpg" alt="" width={2000} height={2000}/>
              </div>
              <div className="flex flex-col justify-center items-center text-stone-200">
                <p> Hello, I am Angel Nikolov and I am {Age} years old.<br/>
                    Currently, I am first year student in Fontys UAS with Information and Communication Technologies.<br/>
                    I really want to continue my development in the field of cybersecurity, that is why I am going to study infrastructure and netwoking, so I can broaden my knowledge
                    and because I really like the whole concept of planning and constructing infrastructures.<br/>
                    I have around 5 years of experience in the field of software developing from school. I have used:<br/>
                </p>
                <ImageLanguage/>
              </div>
            </div>
        </div>
        <div id="certifications">
            <div className="flex flex-col justify-center items-center mb-10">
              <div className="flex justify-center items-center bg-gray-50 h-16 w-3/4 rounded-lg mb-5">
                <h1 className="text-violet-600 text-2xl font-sans">Certifications</h1>
              </div>
              <ImageCertifications/>
            </div>
        </div>
        <div id="projects">
            <div className="flex flex-col justify-center items-center mb-10">
              <div className="flex justify-center items-center bg-gray-50 h-16 w-3/4 rounded-lg mb-5">
                <h1 className="text-violet-600 text-2xl font-sans">Projects</h1>
              </div>
              <GitHubProjects/>
            </div>
        </div>
    </div>
  );
}
