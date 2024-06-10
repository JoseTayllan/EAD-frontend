import * as S from './styles';

import bannerImage from '../../assets/images/empty-profile.png';
import { Figure } from '../Figure';

export function Banner() {
    return (
        <S.Container>
            <S.Content>
                <S.Rectangle />
                <Figure
                    src={bannerImage}
                    alt="Banner"
                    style={
                        {
                            paddingTop: '70px',
                            marginLeft: '-15px',
                            width: 'max(30%, 190px)',
                        }
                    }
                />
                <S.TextContainer>
                    <S.Title>
                        Em breve um universo de Livros, Cursos, Podcasts e Fóruns!
                    </S.Title>
                    <S.Description>
                       Aproveite os diversos cursos e Materiais.
                    </S.Description>
                </S.TextContainer>
            </S.Content>
        </S.Container>
    );
}