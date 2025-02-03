'use client'
import Table from '@/components/table/Table'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllSounds } from '../../database/getAllSounds'
import { listAllUsers } from '../../database/listAllUsers'
import Users from '@/components/table/Users'
import { isAdmin } from '../../database/isAdmin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../../database/createUser'

const Admin = () => {

  const router = useRouter()
  const [showSoundsPanel, setShowSoundsPanel] = useState(true)
  const [allSounds, setAllSounds] = useState()
  const [allUsers, setAllUsers] = useState()
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState()

  const adminCheck = isAdmin()

  async function fetchAllSounds() {
    let result = await getAllSounds()
    setAllSounds(result)
  }

  async function fetchUsersList() {
    const result = await listAllUsers()
    setAllUsers(result)
  }

  useEffect(() => {
    fetchAllSounds()
  }, [showSoundsPanel])

  useEffect(() => {
    if (!showSoundsPanel) {
      fetchUsersList()
    } else {
      fetchAllSounds()
    }
  }, [showSoundsPanel, refreshKey])


  if (adminCheck) {
    createUser();
  }
  else {
    return router.replace('/admin/login')
  }

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className='flex w-full h-[60px] z-[9999] bg-[#F6F8FC] fixed top-0 dark:bg-gray-900 items-center px-10 justify-between'>
        <Link href={'/'}>
          <div className='flex gap-3 items-center'>
            <Image className="img w-10" src={logo} alt="logo" />
            <h6 className="gradtext font-semibold text-center hidden md:block drop-shadow-lg text-md md:text-2xl">Soundeffectbuttons</h6>
          </div>
        </Link>
        <div className='flex items-center justify-center'>
          <button onClick={() => setShowSoundsPanel(!showSoundsPanel)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{showSoundsPanel ? 'All Users' : 'All Sounds'}</button>
        </div>
      </div>
      <div key={refreshKey} className='mt-[60px] h-[calc(100vh-60px)]'>
        {showSoundsPanel ?
          <Table setRefreshKey={setRefreshKey} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setCurrentPage={setCurrentPage} currentPage={currentPage} adminCheck={adminCheck} showSoundsPanel={showSoundsPanel} allSounds={allSounds} />
          : <Users setRefreshKey={setRefreshKey} allUsers={allUsers} />}
      </div>
    </div>
  )
}

export default Admin
