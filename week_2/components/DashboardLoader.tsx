import React from 'react'

const DashboardLoader = () => {
    return (
        <div className="h-screen p-2">
            <div className="animate-pulse flex justify-between items-center p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800">
                <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="flex gap-2 items-center">
                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
                </div>
            </div>
            <div className="flex">
                <div className="mt-6 h-[calc(100vh_-_100px)]  w-2/12 mr-2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="mt-6 h-[calc(100vh_-_100px)] w-10/12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
        </div>
    )
}

export default DashboardLoader