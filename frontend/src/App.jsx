import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Content from './Components/Content'
import ADDTODO from './Components/ADDTODO'
import TODOLIST from './Components/TODOLIST'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Content />}></Route>
        <Route path='/:name' element={<ADDTODO />}></Route>
        <Route path='/:name/todolist' element={<TODOLIST />}></Route>
      </Routes>
    </>
  )
}

export default App
