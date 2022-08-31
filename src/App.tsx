import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerDisplay } from './components/timer-display';
import { backgroundColor } from './color-constants';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, GlobalStyles, Grid, Link, Toolbar, Typography } from '@mui/material';
import { Stopwatch } from './components/stopwatch';
import { Timer } from './components/timer';

function App() {
  const [isStopwatch, setIsStopwatch] = useState(true);

  const handleStopwatch = () => {
    setIsStopwatch(true);
  }

  const handleTimer = () => {
    setIsStopwatch(false);
  }

  return (
    <div className="App">
        <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={handleStopwatch} size='large' variant="outlined" sx={{ width: 270, marginRight: 2 }}>
            Stopwatch
          </Button>
          <Button onClick={handleTimer} size='large' variant="outlined" sx={{ width: 270, marginLeft: 2 }}>
            Timer
          </Button>
        </Toolbar>
      </AppBar>
      {/* Main content */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        {isStopwatch ? <Stopwatch /> : <Timer/>}
      </Container>
      {/* End main content */}
    </React.Fragment>
    </div>
  );
}

export default App;
