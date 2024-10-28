import React, { useEffect, useState } from 'react'
import './style/Service.css'
import {  useNavigate } from 'react-router-dom'

import Card from './Card'
import { useAuth0 } from '@auth0/auth0-react'
function Service() {
  const [search, setSearch] = useState('')
  const { isAuthenticated, user } = useAuth0()

 const navigate=useNavigate()
  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate('/without')
    // }
  }, [])
  return (
    <div className="main">
      <div>
        <input
          type="text"
          placeholder="Search (type in lowercase)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          className="cont-input create_input search_input"
        />
      </div>
      <div className="cards_view">
        <Card search={search} />
      </div>
    </div>
  )
}
export default Service
