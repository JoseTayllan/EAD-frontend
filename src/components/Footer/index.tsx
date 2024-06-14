import * as S from './styles'

import { Brand } from '../Brand'

import logo from '@/assets/logos/Logo-EAD.png';

import { theme } from '../../styles/theme';

import CopyrightIcon from '@mui/icons-material/Copyright';

export function Footer() {
  const company = {
    logoUrl: logo,
    width: 85,
    height: 85,
  }
  return (
    <S.Container>
      <S.Content>
        <Brand style={{ width: '25vw', color: theme.coead.light[700], fontSize: 15.262}} company={company}/>
        <S.CopyRight>
          <CopyrightIcon style={
            {
              fontSize: "20px",
            }
          }
          />
          <span>2024 - Todos os direitos reservados.</span>
        </S.CopyRight>
      </S.Content >
    </S.Container>
  )
}