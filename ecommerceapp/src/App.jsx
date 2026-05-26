import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import Card from './pages/Card'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
     <Routes>
          <Route path="" element={<MainLayout/>}>
            <Route path='/' element={<Home/>}/> 
            <Route path='/Card' element={<Card/>}/>
          </Route>
        </Routes>
              <ToastContainer />

    </>
      
  )
}

export default App
