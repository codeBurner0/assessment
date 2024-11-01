import React, { useEffect, useState } from 'react'
import './style/Service.css'
import { useNavigate } from 'react-router-dom'

import Card from './Card'
import { useAuth0 } from '@auth0/auth0-react'
function Service() {
  const [search, setSearch] = useState('')
  const { isAuthenticated, user } = useAuth0()

  const navigate = useNavigate()

  const [totalContacts, setTotalContacts] = useState(0)
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let result = await fetch(`https://assessment-zyub.vercel.app/api/contacts?page=${page}&limit=${limit}`);
        let response = await result.json()
        setContacts(response.data);
        setTotalContacts(response.total);
      } catch (error) {
        console.error('Failed to fetch contacts', error);
      }
    };
    fetchContacts();
  }, [page, limit]);

  const totalPages = Math.ceil(totalContacts / limit)
  console.log(totalPages,'hello ji')

  // Handle changing pages
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

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
        <Card search={search} contacts={contacts} />
      </div>

      <div className="pagination_container">
      <div className='paginationbar'>
        <button onClick={goToPreviousPage} disabled={page === 1} className="page">
          Previous
        </button>
        <span className="page-number"> Page {page} of {totalPages} </span>
        <button onClick={goToNextPage} disabled={page === totalPages} className="page">
          Next
        </button>
      </div>
      </div>
    </div>
  )
}
export default Service
