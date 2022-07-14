import Grid from '@mui/material/Grid';
import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Board />
      </Grid>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
    </Grid>
  );
}

export default App;
