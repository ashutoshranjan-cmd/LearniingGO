import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./component/Header"
import {Suspense, lazy} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector } from "react-redux";
import Footer from "./component/Footer";





const Home = lazy(()=> import("./component/Home"));
const Learning = lazy(()=> import("./component/Learning"))
const Quiz = lazy(()=> import("./component/Quiz"))
const Result = lazy(() => import("./component/Result"))
const Loader = lazy(() => import("./component/Loader"))
// const Login  = lazy(()=> import("./component/Login"))

function App() {
  const {darkMode} = useSelector((state:{root:StateType})=>state.root)
  const darkTheme = createTheme({
    palette: {
      mode: `${darkMode?"dark":"light"}`,
      primary:{
        main:`${darkMode?"#BB86FC":"rgb(255,0,0)"}`,
      }
    },

  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
      <Header/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/learn" element={<Learning/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route  path="/result" element={<Result/>}/>
        {/* <Route  path="/login" element={<Login/>}/> */}
      </Routes>
      </Suspense>
        <Footer/>
    </Router>
     </ThemeProvider>
  )
}

export default App
