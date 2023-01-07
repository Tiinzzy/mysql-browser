import Header from './front-end/Header'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2180A4'
    }
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </>)
}

export default App;
