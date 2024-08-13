import { Button, Container, Typography,Stack } from "@mui/material"
import {ArrowBack, VolumeUp} from "@mui/icons-material"
import { useEffect, useState,useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getWordsFail, getWordsRequest, getWordsSuccess } from "../redux/slices";
import { fetchAudio } from "../utils/features";
import Loader from "./Loader";
import LoadingBar from 'react-top-loading-bar'

const Learning = () => {
  const [count,setCount] = useState<number>(0);
  const [audioSrc,setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);
  const params = useSearchParams()[0].get("language") as LangType
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const ref = useRef<null|any>(null)
  const {loading,error,words,darkMode} = useSelector((state:{root:StateType})=> state.root)
  const nextHandler = ()=>{
    setCount((prev)=> prev+1);
    ref.current.complete();
    setAudioSrc("")

  }
  useEffect(()=>{
    dispatch(getWordsRequest());
     translateWords(params || "hi")
     .then((arr:WordType[])=>{
      dispatch(getWordsSuccess(arr)); 
      console.log(arr);
      
     }).catch((err)=>{
      dispatch(getWordsFail(err))
      if(error)
          alert(error)
        dispatch(clearState())
      
     })
  },[])
  const  audioHandler =  async()=>{
    const player: HTMLAudioElement = audioRef.current!;

    if(player)
      {
        player.play();
      }
      else{
        const data = await fetchAudio(words[count]?.meaning,params);
        setAudioSrc(data);
      }


  }
  if(loading)
     return <Loader/>
  
  return (
    
    <Container sx={{marginTop:"10rem", padding:"4rem"}}>
      <LoadingBar color='orange' ref={ref} />
    {
      audioSrc && <audio src= {audioSrc} autoPlay ref={audioRef}></audio>
    }
    <Button onClick={count === 0 ?()=>navigate("/"):()=>{setCount((prev)=>(prev-1)); setAudioSrc("")}}>
      <ArrowBack/>
    </Button>
    <Typography m={"2rem 0"} >Learning made easy</Typography>
    <Stack direction={"row"} spacing={"1rem"}>
      <Typography variant={"h4"}>
        {count+1} - {words[count]?.word}

      </Typography>
      <Typography color={"blue"} variant="h4">
        :{words[count]?.meaning}
      </Typography>
      <Button sx={{borderRadius:"50%",color:"black"}} onClick={audioHandler}>
        <VolumeUp style={{color:`${darkMode?"white":"black"}`}}/>
      </Button>
    </Stack>
    <Button sx={{ margin:"3rem 0"}} variant="contained" fullWidth
    onClick={count ===7 ? ()=>navigate("/quiz"): nextHandler}>
      { count === 7 ? "Text" :"Next"}
    </Button>
  </Container>
  )
}

export default Learning
