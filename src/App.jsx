import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import Main from './components/Main'
import Edit from './components/Edit'
import View from './components/View'


const App = () => {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/update/:id' element={<Edit/>}/>
      <Route path='/view/:id' element={<View/>}/>
    </Routes>
    </>
  )
}

export default App