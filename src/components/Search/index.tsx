import * as S from './styles'
import SearchIcon from '@mui/icons-material/Search'

import { theme } from '../../styles/theme'

import { Input } from '../Input'

type SearchProps = {
  searchProps: {
    placeholder: string;
    style?: React.CSSProperties;
    setSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  },
}

export function Search(
    props: SearchProps,
  ) {

    return (
    <S.Container>
      <S.Content
        style={{
          maxWidth: props.searchProps.style?.maxWidth,
        }
        }
      >
        <Input
          placeholder={props.searchProps.placeholder}
          variant="standard"
          icon={
            <SearchIcon
              sx={
                { 
                  ml: 1, 
                  color: theme.foodExplorer.light[400]
                }
              }
            />
          }
          onChange={event => props.searchProps.setSearch(event)}
          onKeyDown={(event) => props.searchProps.handleKeyDown(event)}
          style={props.searchProps.style}
        />
      </S.Content>
    </S.Container>
  )
}