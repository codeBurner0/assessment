import React from 'react'
import Header from './Component/Header'
import CreateContact from './Component/CreateContact'
import Cards from './Component/Blogs'
import {Route,Routes } from 'react-router-dom';
import Home from './Component/Home'
import Footer2 from './Component/Footer2'
import WithoutLogin from './Component/WithoutLogin'

function App() {
  return (
      <div>
        <Header/>
        <Routes>
            <Route exact path='/' Component={Home} />
            <Route path='/createContact' Component={CreateContact} />
            <Route path='/contacts' Component={Cards} />
            <Route path='/without' Component={WithoutLogin} />
        </Routes>
        <Footer2/>
      </div>
  )
}

export default App;