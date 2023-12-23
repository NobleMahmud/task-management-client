import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const DashBoard = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();

  const {data: tasks = [], isPending: loading, refetch} = useQuery({
    queryKey: ['tasks'],
    queryFn: async ()=>{
        const res = await axiosPublic.get('/tasks');
        return res.data;
    }
})
console.log(tasks);

  // const [tasks, settasks] = useState([]);
  // useEffect(()=>{
  //   fetch('/tasks.json')
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log(data);
  //     settasks(data);
  //   })
  // },[])

  const currentUserTasks = tasks.filter(task=>task?.email===user?.email);

  const completed = currentUserTasks.filter(task=>task.status==='completed');
  const ongoing = currentUserTasks.filter(task=>task.status==='ongoing');
  const toDo = currentUserTasks.filter(task=>task.status==='to-do');

  console.log(ongoing, toDo);
  
    return (
        <div>
            {/* <body className="relative bg-yellow-50 overflow-hidden max-h-screen">
  <header className="fixed right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
            <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span className="text-sm">Archive</span>
          </button>
        </div>
        <div className="text-lg font-bold">Today's Plan</div>
        <div>
          <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
            <span className="text-sm">This week</span>
            <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
    <div className="flex flex-col justify-between h-full">
      <div className="flex-grow">
        <div className="px-4 py-6 text-center border-b">
          <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">Task Manager</span> App</h1>
        </div>
        <div className="p-4">
          <ul className="space-y-1">
            <li>
              <a href="javascript:void(0)" className="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                </svg>Plan
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
                </svg>Task list
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                </svg>Projects
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>Tags
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </button> <span className="font-bold text-sm ml-2">Logout</span>
      </div>
    </div>
  </aside>

  <main className="ml-60 pt-16 max-h-screen overflow-auto">
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 mb-5">
          <h1 className="text-3xl font-bold mb-10">Messaging ID framework development for the marketing branch</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-stretch">
              <div className="text-gray-400 text-xs">Members<br/>connected</div>
              <div className="h-100 border-l mx-4"></div>
              <div className="flex flex-nowrap -space-x-3">
                <div className="h-9 w-9">
                  <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random"/>
                </div>
                <div className="h-9 w-9">
                  <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random"/>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <button type="button" className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>
              </button>
              <button type="button" className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                Open
              </button>
            </div>
          </div>

          <hr className="my-10"/>

          <div className="grid grid-cols-2 gap-x-20">
            <div>
              <h2 className="text-2xl font-bold mb-4">Stats</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="p-4 bg-green-100 rounded-xl">
                    <div className="font-bold text-xl text-gray-800 leading-none">Good day, <br/>Kristin</div>
                    <div className="mt-5">
                      <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                        Start tracking
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                  <div className="font-bold text-2xl leading-none">20</div>
                  <div className="mt-2">Tasks finished</div>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                  <div className="font-bold text-2xl leading-none">5,5</div>
                  <div className="mt-2">Tracked hours</div>
                </div>
                <div className="col-span-2">
                  <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                    <div className="font-bold text-xl leading-none">Your daily plan</div>
                    <div className="mt-2">5 of 8 completed</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Your tasks today</h2>

              <div className="space-y-4">
                <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">Number 10</div>
                    <div className="text-gray-400 text-xs">4h</div>
                  </div>
                  <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Blog and social posts</a>
                  <div className="text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>Deadline is today
                  </div>
                </div>
                <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">Grace Aroma</div>
                    <div className="text-gray-400 text-xs">7d</div>
                  </div>
                  <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">New campaign review</a>
                  <div className="text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>New feedback
                  </div>
                </div>
                <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">Petz App</div>
                    <div className="text-gray-400 text-xs">2h</div>
                  </div>
                  <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Cross-platform and browser QA</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</body> */}
<body className="flex bg-gray-100 min-h-screen">
  {/* <aside className="hidden sm:flex sm:flex-col">
    <a href="#" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500">
      <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
        <title>Company logo</title>
        <path d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z" fill="#fff"/>
      </svg>
    </a>
    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <a href="#" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Folders</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </a>
        <a href="#" className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg">
          <span className="sr-only">Dashboard</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </a>
        <a href="#" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Messages</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a href="#" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Documents</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </a>
      </nav>
    </div>
  </aside> */}
  <div className="flex-grow text-gray-800">
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
      {/* <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
        <span className="sr-only">Menu</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button> */}
  
      <div className="flex flex-shrink-0 items-center ml-auto">
        <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
          <span className="sr-only">User Menu</span>
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="font-semibold">{user?.displayName}</span>
            
          </div>
          <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            <img src={user?.photoURL} alt="user profile photo" className="h-full w-full object-cover"/>
          </span>
         
        </button>
        <div className="border-l pl-3 ml-3 space-x-1">
          <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            <span className="sr-only">Log out</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
          </button>
        </div>
      </div>
    </header>
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Welcome Back!</h1>
          <h2 className="text-gray-600 ml-0.5">Let's get started</h2>
        </div>
        <div className="flex flex-wrap items-start justify-end -mb-3">
          {/* <button className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Manage dashboard
          </button> */}
          <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create new task
          </button>
        </div>
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{currentUserTasks?.length}</span>
            <span className="block text-gray-500">Total Tasks</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{completed?.length}</span>
            <span className="block text-gray-500">Completed</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{ongoing?.length}</span>
            <span className="block text-gray-500">On Going</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">{toDo?.length}</span>
            <span className="block text-gray-500">To Do</span>
          </div>
        </div>
       
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 lg:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Tasks Done</div>
          <div className="p-4 flex-grow">
            <div className="flex flex-col items-center h-full px-4 py-16 text-gray-800 text-md font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <ul>
                {completed?.map((c, idx)=><li className='p-2 m-1 rounded-lg bg-gray-200' key={c._id}>{idx+1}. {c?.name}</li>)}
                </ul>
              </div>
          </div>
        </div>

        {/* <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Tasks On Process</div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            <div className="flex flex-col items-center h-full px-4 py-16 text-gray-800 text-md font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <ul>
                {ongoing?.map((c, idx)=><li className='p-2 m-1 rounded-lg bg-gray-200' key={c._id}>{idx+1}. {c?.name}</li>)}
                </ul>
              </div>
              </div>
          </div>
        </div> */}
          <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Tasks On Process</div>
          <div className="p-4 flex-grow">
          <div className="flex flex-col items-center h-full px-4 py-16 text-gray-800 text-md font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <ul>
                {ongoing?.map((c, idx)=><li className='p-2 m-1 rounded-lg bg-gray-200' key={c._id}>{idx+1}. {c?.name}</li>)}
                </ul>
              </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Tasks Remaining</div>
          <div className="p-4 flex-grow">
          <div className="flex flex-col items-center h-full px-4 py-16 text-gray-800 text-md font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                <ul>
                {toDo?.map((c, idx)=><li className='p-2 m-1 rounded-lg bg-gray-200' key={c._id}>{idx+1}. {c?.name}</li>)}
                </ul>
              </div>
          </div>
        </div>
      </section>
     
    </main>
  </div>
</body>
        </div>
    );
};

export default DashBoard;