'use client'
import { useEffect, useState } from 'react';

const githubapi = "https://api.github.com";
const username = "achonikolov592";

const GitHubProjects = () => {
    const [projects, setProjects] = useState<Array<{name:string, description: string, url:string}>>()
    const [isExpanded, setIsExpanded] = useState<boolean[]>([]);

    function toggleContent(index:number){
        setIsExpanded(prevState => 
            prevState.map((element, i) => (i === index ? !element : element))
        );
    }; 


    useEffect(()=>{
        const getProjects = async ()=>{
            const response = await fetch(`${githubapi}/users/${username}/repos`);
            
            if (response.ok){
                const projectsInGithub = await response.json();
                let projectsToReturn:{name:string, description: string, url:string}[] = []
                for (const project of projectsInGithub) {
                    projectsToReturn = [...projectsToReturn, {name:project.name, description:project.description, url:project.html_url}]
                }

                setProjects(projectsToReturn)
                setIsExpanded(Array(projectsToReturn.length).fill(false));

            }
            
        };

        getProjects();
        
    }
    ,[]);

    return (
    <div className='grid grid-cols-2 gap-1 w-3/4'>
        {projects?.map((value, index) => (
                <div key={index} className="flex bg-gray-50 rounded-lg border-double border-2 border-violet-600 p-2">
                    <div className="flex flex-col">
                        <a className="text-violet-600" href={value.url} target="_blank" rel="noopener noreferrer">{value.name}</a>
                        {isExpanded[index] && (
                            <div className="mt-2 w-72">
                                <p>{value.description || "No description available."}</p>
                            </div>
                        )}
                        <button
                            onClick={()=>{toggleContent(index)}}
                            className="mt-2 text-violet-600 underline"
                        >
                            {isExpanded[index] ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                    
        ))}
    </div>
    )
}

export default GitHubProjects;