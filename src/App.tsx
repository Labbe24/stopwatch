import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimerDisplay } from './components/timer-display';
import { backgroundColor } from './color-constants';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, GlobalStyles, Grid, Link, Toolbar, Typography } from '@mui/material';

function App() {
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
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Stop Watch
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Main content */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <TimerDisplay></TimerDisplay>
      </Container>
      {/* End main content */}
    </React.Fragment>
    </div>
  );
}

export default App;
