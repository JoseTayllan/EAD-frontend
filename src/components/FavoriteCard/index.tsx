import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'
import { theme } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

interface CourseCardProps {
  props: {
      hasPermission: boolean;
      courseId: string | undefined;
      courseName: string | undefined;
      coursePrice: string | undefined;
      courseImage: string | undefined;
      onClickFavorite: (courseId: string | undefined) => void;
      isFavorite: boolean | undefined;
  }
}

interface FigureProps {
  style?: React.CSSProperties;
}

const figureProps: FigureProps = {
  style: {
      margin: '0 auto',
      display: 'block',
      maxWidth: '200px',
      width: '88px',
      height: '88px',
  }
};

export function FavoriteCard({ props }: CourseCardProps) {
  const navigate = useNavigate();

  return(
      <Card
          sx={
              {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                paddingTop: '24px',
                borderRadius: '8px',
                width: '55vw',
                maxWidth: '300px',
                backgroundColor: theme.coead.dark[200],

                margin: '24px auto 0',
                padding: '0 12px',

                gap: '10px',
              }
          }
      >
      <CardMedia
      component={'img'}
      image={props.courseImage}
      title={`Imagem do prato selecionado ${props.courseName}`}
      alt={`Prato selecionado ${props.courseName}`}
      {...figureProps}
      sx={
          {
              borderRadius: '50%',
          }
      }
      />
      <Box
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '100%',
                }
            }
      >
      <CardContent
            sx={
                {
                    width: '100%',

                    margin: '0',
                    padding: '0',
                }
            }
      >
      <Button
          variant="text"
          sx={
              {
                  textTransform: "none",
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                  color: theme.coead.light[300],

                  fontSize: '24px',

                  margin: '0',
                  padding: '0',
              }
          }
          onClick={() => navigate(`/course/${props.courseId}`)}
      >
          {props.courseName}
      </Button>
      </CardContent>
      <CardActions
          sx={
              {
                width: '100%',
                margin: '0',
                padding: '0',
              }
          }>
      <Button
          variant="text"
          sx={
              {
                  textTransform: "none",
                    display: 'flex',
                    justifyContent: 'flex-start',
                    
                  color: theme.coead.tints.tomato[100],
                  width: '100%',

                  fontSize: '12px',

                    margin: '0',
                    padding: '0',
              }
          }
          onClick={() => props.onClickFavorite(props.courseId)}
      >
          Remover dos favoritos
      </Button>
      </CardActions>

      </Box>
      </Card>
  )
}