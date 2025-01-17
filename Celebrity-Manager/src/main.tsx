
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StyledEngineProvider } from "@mui/material/styles";
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
)
