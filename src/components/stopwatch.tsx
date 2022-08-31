import { Box, Grid, Typography, List, Divider, ListItem, ListItemText, SxProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { PrimaryButton } from "./primary-button";

const styles: {[key: string]: SxProps} = {
    defaultBtn: {
      width: 180,
      height: 80,
      color: "#FFFFFF",
      backgroundColor: "#5783db",
      '&:hover': {
          backgroundColor: "#4681f4",
        }
    },
    startBtn: {
      width: 180,
      height: 80,
      color: "#FFFFFF",
      backgroundColor: "#5cc46e",
      '&:hover': {
          backgroundColor: "#33b249",
        }
    },
    stopBtn: {
      width: 180,
      height: 80,
      color: "#FFFFFF",
      backgroundColor: "#fa523c",
      '&:hover': {
          backgroundColor: "#FF1E00",
        }
    },
    saveBtn: {
      width: 180,
      height: 80,
    },
  }

interface Props {
    
}

export const Stopwatch: FC<Props> = React.memo(() => {
    const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
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
        else if(seconds >= 59 && minutes >= 59)
        {
          setSeconds(1);
          setMinutes(1);
          setHours(hours => hours + 1);
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
      const splitTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
      setSplitTimes(splitTimes => [...splitTimes, splitTime]);
    }
  }

  const handleSave = () => {

  }
    return(
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <Typography variant="h1">{`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              {isActive ? <PrimaryButton onClick={startStopHandler} sx={styles.stopBtn}>STOP</PrimaryButton> :
              <PrimaryButton onClick={startStopHandler} sx={styles.startBtn}>START</PrimaryButton>}
            </Grid>
            <Grid item xs={4}>
              <PrimaryButton onClick={resetHandler} sx={styles.defaultBtn}>RESET</PrimaryButton>
            </Grid>
            <Grid item xs={4}>
              <PrimaryButton onClick={splitHandler} sx={styles.defaultBtn}>SPLIT</PrimaryButton>
            </Grid>
    
            
    
            <Grid item xs={12}>
                {splitTimes?.map((s, index) => 
                  <List>
                    <Divider/>
                    <ListItem sx={{textAlign: "center"}} key={index}>
                      <ListItemText primary={index + 1}/>
                      <ListItemText primary={s}/>
                    </ListItem>
                  </List>)
                }
                {splitTimes && splitTimes.length > 0 &&
                  <Grid item xs={12}>
                    <PrimaryButton variant="outlined" onClick={handleSave} sx={styles.saveBtn}>SAVE</PrimaryButton>
                  </Grid>}
            </Grid>
          </Grid>
        </Box>
      )
});