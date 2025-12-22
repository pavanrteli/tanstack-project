import React from 'react'
import Header from './components/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Fetchrq from './components/Fetchrq'
import Home from './components/Home'
import Fetchold from './components/Fetchold'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import FetchIndv from './components/FetchIndv'
import FetchList from './components/FetchList'

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Header/>}>
       <Route path='/rq' element={<Fetchrq/>}>
        <Route index element={<FetchList/>}/>
        <Route path='/rq/:id' element={<FetchIndv/>}/>
       </Route>
       <Route path='/old' element={<Fetchold/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App