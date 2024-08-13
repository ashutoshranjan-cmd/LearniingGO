import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import {FormControlLabel, Container, FormControl, FormLabel, RadioGroup, Typography, Button,Radio } from "@mui/material";
import{ useSelector ,useDispatch} from "react-redux";
import { saveResult } from "../redux/slices";
import LoadingBar from 'react-top-loading-bar'


// import { Label } from "@mui/icons-material";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef<null|any>(null);

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    ref.current.complete();
    setAns("")
  }
  const {words} = useSelector((state:{root:StateType})=> state.root)
  useEffect(()=>{
    if(count +1 > words.length)
        navigate("/result")
     dispatch(saveResult(result));
  },[result])


  return (
    <Container maxWidth="sm" sx={{ padding: "1rem", marginTop:"10rem" }}>
      <LoadingBar color='orange' ref={ref} />

      <Typography m={"2rem 0"}>
        Quiz
      </Typography>
      <Typography variant={"h3"}>
        {count + 1}-{words[count]?.word}

      </Typography>
      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>
          Meaning
        </FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {
            words[count]?.options.map((i,idx)=>(
              <FormControlLabel
              value={i}
              control={<Radio/>}
              label={i}
              key={idx}
              />
            ))
          }
        </RadioGroup>
      </FormControl>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={ans === ""}
      >
        {count === words.length -1 ? "Submit" : "Next"}
      </Button>
    </Container>
  )
}

export default Quiz

