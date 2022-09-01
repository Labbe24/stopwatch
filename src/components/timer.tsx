import { Box, Divider, Grid, List, ListItem, ListItemText, SxProps, TextField, Typography } from "@mui/material";
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
        backgroundColor: "#5BB318",
        '&:hover': {
            backgroundColor: "#7DCE13",
          }
      },
    stopBtn: {
        width: 180,
        height: 80,
        color: "#FFFFFF",
        backgroundColor: "#FF1E00",
        '&:hover': {
            backgroundColor: "#fa523c",
          }
      },
  }

interface Props {
    
}

export const Timer: FC<Props> = React.memo(() => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    useEffect(() => {
        if(isActive)
        {
          const interval = setInterval(() => {
            if(seconds <= 1)
            {
                if(minutes > 0)
                {
                    setSeconds(59);
                    setMinutes(minutes => minutes - 1);
                }

                if(minutes <= 1)
                {
                    if(hours > 0)
                    {
                        setMinutes(59);
                        setHours(hours => hours - 1);
                    }
                }

                if(minutes < 1 && hours < 1)
                {
                    setSeconds(0);
                    setIsActive(false);
                    clearInterval(interval);
                }
 
            }
            else
            {
              setSeconds(seconds => seconds - 1);
            }
          }, 1000);
          setIntervalId(interval);
          return () => clearInterval(interval);
        }
      },[isActive, seconds]);

    const handleHours = (e: any) => {
        setHours(e.target.value);
    }

    const handleMinutes = (e: any) => {
        setMinutes(e.target.value);
    }

    const handleSeconds = (e: any) => {
        setSeconds(e.target.value);
    }

    const startStopHandler = () => {
        setIsActive(!isActive);
    };

    const resetHandler = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        clearInterval(intervalId);
      };

    return(
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container rowSpacing={4} columnSpacing={1}>
          <Grid item xs={4}>
            <TextField
                label="Hours"
                type="number"
                value={hours}
                onChange={handleHours}
                inputProps={{ min: 0, max: 23 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                label="Minutes"
                type="number"
                value={minutes}
                onChange={handleMinutes}
                inputProps={{ min: 0, max: 59 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField
                label="Seconds"
                type="number"
                value={seconds}
                onChange={handleSeconds}
                inputProps={{ min: 0, max: 59 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Grid>
            <Grid item xs={6}>
              {isActive ? <PrimaryButton onClick={startStopHandler} sx={styles.stopBtn}>STOP</PrimaryButton> :
              <PrimaryButton onClick={startStopHandler} sx={styles.startBtn}>START</PrimaryButton>}
            </Grid>
            <Grid item xs={6}>
              <PrimaryButton onClick={resetHandler} sx={styles.defaultBtn}>RESET</PrimaryButton>
            </Grid>
          </Grid>
        </Box>
      )
});