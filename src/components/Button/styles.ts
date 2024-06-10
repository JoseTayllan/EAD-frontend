import styled from 'styled-components';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)({
  '&.MuiButtonBase-root': {
    backgroundColor: '#2d86ba', 
    color: '#fff',
    border: '1px solid transparent',
    borderRadius: '5px',
    textTransform: 'none'
  },
  '&.MuiButtonBase-root:hover': {
    backgroundColor: '#2f2dba',
    transition: 'box-shadow ease-in 0.3s',
  },
});
