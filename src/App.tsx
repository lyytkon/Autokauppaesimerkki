import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import CarList from './components/CarList'

function App() {
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
      <CssBaseline />
      <CarList />
    </Container>

    </>
  )
}

export default App