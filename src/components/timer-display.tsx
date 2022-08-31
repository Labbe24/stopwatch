import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react";

interface SplitTime {
  index: number;
  time: number;
}

export const TimerDisplay = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [splitTimes, setSplitTimes] = useState<string[]>([]);

  useEffect(() => {
    if(isActive)
    {
      const interval = setInterval(() => {
        if(seconds >= 59)
        {
          setSeconds(1);
          setMinutes(minutes => minutes + 1);
        }
        else
        {
          setSeconds(seconds => seconds + 1);
        }
      }, 1000);
      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  },[isActive, seconds]);

  useEffect(() => {
    if(!isActive)
    {
      clearInterval(intervalId);
    }
  },[isActive, intervalId])

  const startStopHandler = () => {
    setIsActive(!isActive);
  };

  const resetHandler = () => {
    setSeconds(0);
    setMinutes(0);
    setSplitTimes([]);
  };

  const splitHandler = () => {
    if(isActive)
    {
      const splitTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
      setSplitTimes(splitTimes => [...splitTimes, splitTime]);
    }
  }

  return(
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h1">{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Typography>
        </Grid>
        <Grid item xs={4}><Button onClick={startStopHandler}>{isActive ? "STOP" : "START"}</Button></Grid>
        <Grid item xs={4}><Button onClick={resetHandler}>RESET</Button></Grid>
        <Grid item xs={4}><Button onClick={splitHandler}>SPLIT</Button></Grid>
        <Grid item xs={12}>
          <List>
            {splitTimes?.map((s, index) => 
              <ListItem sx={{textAlign: "center"}} key={index}>
                <ListItemText primary={index + 1}/>
                <ListItemText primary={s}/>
              </ListItem>)
            }
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}