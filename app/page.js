'use client'
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault()
    // dynamically load the axios dependency
    const axios = (await import("axios")).default;
    const result = await axios.get(`https://api.github.com/search/users?q=${search}`).then((res) => {
        setResponse(res.data);
    });
  }
 
  return (
      <div className="w-3/4 mx-auto my-10">
        <h1 className="lg:text-xl text-lg pb-4">Search Github Users:</h1>
        <form>   
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
              bg-gray-50 outline-blue-800 focus:ring-blue-800"
              placeholder="Search Github Users..." 
              required/>
              <button 
              onClick={(e)=>handleSearch(e)}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Search</button>
          </div>
        </form>

        <h1>{search} Results</h1>
        <div>
            <div className="flex">
                <p className="p-2 w-1/3">Username</p>
                <p className="p-2 w-1/3">Profile Url</p>
                <p className="p-2 w-1/3">Repositories Url</p>
            </div>
            {response ? (
              <>{response && response?.items?.map((item, index) => (
                <div key={index} className="flex even:bg-gray-200 hover:bg-gray-200/50">
                  <p className="p-2 w-1/3 break-words">{item?.login}</p>
                  <p className="p-2 w-1/3 break-words">{item?.html_url}</p>
                  <p className="p-2 w-1/3 break-words">{item?.repos_url}</p>
                </div>
              ))}
              {response.items && 
              <p className="text-blue-800 font-bold">You got {response.items.length} users</p>
              }</>  
            ) : (
                <p>No Results</p>
            )}
        </div>
      </div>
  )
}
