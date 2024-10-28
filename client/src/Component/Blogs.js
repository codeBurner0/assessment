import React, { useState } from 'react'
import './style/Service.css'
import Card from './Card';
function Service() {
  const [search,setSearch]=useState('');
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
      <div className='cards_view'>
        <Card search={search}/>
      </div>
    </div>
  )
}
export default Service;
