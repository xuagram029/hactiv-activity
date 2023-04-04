import React from 'react';

const Profile = () => {
  return (
<div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-400 to-green-600">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
            <p className="text-[#00bfa6] font-bold">You Are Logged In!</p>
          </div>
          <div className="border-t border-gray-200 text-center">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Sample Name</dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">sample@email.com</dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Sample #123456789</dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Male/Female</dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Birthdate</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">April 4 2023</dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Sample Street 123 City</dd>
              </div>
            </dl>
          </div>
          <button className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded mt-4 hover:shadow-lg">LOGOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Profile