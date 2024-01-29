import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReceiptIcon from '@mui/icons-material/Receipt';

import { theme } from '../../styles/theme'

import * as S from './styles'
import * as Utils from '../../utils/interfaces';

import { api } from '../../services/api';

import { useAuth } from '../../hooks/AuthProvider';

import logo from '../../assets/logos/weapons.png'

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Menu } from '../../components/Menu';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export function Dish() {
    const { user } = useAuth();
    const { id } = useParams();
    const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';    
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
    const dishes = (
      JSON.parse(
        localStorage.getItem('@food-explorer-backend:dishes')
        ? (localStorage.getItem('@food-explorer-backend:dishes') as string)
          : '[]'
      )
    );
    const [openOrder, setOpenOrder] = useState<Utils.openOrderProps[]>(
      JSON.parse(
        localStorage.getItem('@food-explorer-backend:openOrder')
      ? (localStorage.getItem('@food-explorer-backend:openOrder') as string)
          : '[]'
      )
    );
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
  
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        const userFavorites = JSON.parse(
            localStorage.getItem('@food-explorer-backend:favorites')
            ? (localStorage.getItem('@food-explorer-backend:favorites') as string)
            : '[]'
        );
        if (userFavorites) {
          const isDishFavorite: boolean = userFavorites.find((item: Utils.dishProps) => item.id === id) ? true : false;
            if (isDishFavorite) {
            setIsFavorite(true);
            } else {
            setIsFavorite(false);
            }
        }
      }, []);
  
    interface FigureProps {
      style?: React.CSSProperties;
    }
  
    const figureProps: FigureProps = {
      style: {
        margin: '0 auto',
        display: 'block',
        maxWidth: '290px',
        width: '264px',
        height: '264px',
        borderRadius: '50%',
      }
    };
  
    interface DishCardProps {
        dishName: string;
        dishDescription: {
            summary: string;
            full: string;
        };
        dishPrice: string;
        dishImage: string;
        dishTags: string[];
        isFavorite: boolean;
    }

    const dishProps: DishCardProps = {
        dishName: dishes.find((dish: Utils.dishProps) => dish.id === id)?.name ?? '',
        dishDescription: {
            summary: dishes.find((dish: Utils.dishProps) => dish.id === id)?.summary_description ?? '',
            full: dishes.find((dish: Utils.dishProps) => dish.id === id)?.full_description ?? '',
        },
        dishPrice: dishes.find((dish: Utils.dishProps) => dish.id === id)?.price ?? '',
        dishImage: dishes.find((dish: Utils.dishProps) => dish.id === id)?.image ? `${api.defaults.baseURL}/files/${dishes.find((dish: Utils.dishProps) => dish.id === id)?.image}` : logo,
        dishTags: dishes.find((dish: Utils.dishProps) => dish.id === id)?.ingredients.split(';') ?? [],
        isFavorite: isFavorite,
    }

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleClickFavorite() {
    const favorites = JSON.parse(
        localStorage.getItem('@food-explorer-backend:favorites')
        ? (localStorage.getItem('@food-explorer-backend:favorites') as string)
        : '[]'
        );
    if (isFavorite) {
      const remainingFavorites = favorites.filter((dish: Utils.dishProps) => dish.id !== id)

    const values = {
        userId: user.id,
        dishId: id,
    }
    api.patch(`favorite/`, values).then(() => {
        localStorage.setItem('@food-explorer-backend:favorites', JSON.stringify(remainingFavorites))
        setIsFavorite(false);
    }).catch((error) => {
        console.error(error)
        alert("Não foi possível realizar operação")
    });
    } else {
    const values = {
        userId: user.id,
        dishId: id,
    }
    api.patch(`favorite/`, values).then(() => {
        localStorage.setItem('@food-explorer-backend:favorites', JSON.stringify([
            ...favorites,
            dishes.find((dish: Utils.dishProps) => dish.id === id)
        ]))
        setIsFavorite(true);
    }).catch((error) => {
        console.error(error)
        alert("Não foi possível realizar operação")
    });
    }
  }

  function handleClickIncludeOrder(dishId: string | undefined, quantity: number) {
    const isOpenOrderArray = Array.isArray(openOrder);

    if (isOpenOrderArray) {
      setOpenOrder([
        ...openOrder,
        {
          dishId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@food-explorer-backend:openOrder',
        JSON.stringify([
          ...openOrder,
          {
            dishId,
            quantity
          }
        ]))
        );
    } else {
      setOpenOrder([
        openOrder,
        {
          dishId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@food-explorer-backend:openOrder',
        JSON.stringify([
          openOrder,
          {
            dishId,
            quantity
          }
        ]))
      );
    }
  }

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpened(false);
    }
  }, [isDesktop]);

    return(
        <S.Container
        $opened={isSideBarOpened}
      >
        <Header
          // onInputChange
          hasPermission={hasPermission}
          isMenuOpened={isMenuOpened}
          onClickMenu={handleClickMenu}
        />
        <Sidebar
          onClickSideBarButton={handleSideBarActions}
          isOpened={isSideBarOpened}
          hasPermission={hasPermission}
        />
            <S.Content $opened={isMenuOpened}>

                <Box
                    id="content-box"
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 0,
                    }}
                >
                {
                  isMenuOpened ? (
                    <Menu isOpened={isMenuOpened}/>
                  ) : (
                    <>
                <Button
                    variant="outlined"
                    sx={
                        {
                            textTransform: "none",
                            color: theme.foodExplorer.light[100],
                            width: 'fit-content',
                            margin: '0',
                            padding: '8px 16px 8px 8px',

                            borderColor: theme.foodExplorer.light[100],
                        }
                    }
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon />
                    voltar
                </Button>
                
                <Card
                    sx={
                        {
                            backgroundColor: theme.foodExplorer.dark[900],
                            margin: '16px auto 32px',
                            padding: '0',
                            position: 'relative',
                            paddingTop: '16px',
                            borderRadius: '8px',
                            maxWidth: '75vw',
                        }
                    }
                >
                    {dishProps.isFavorite ? (
                        <FavoriteIcon
                            sx={
                                {
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    margin: '16px',
                                    color: 'red',
                                    fontSize: '2rem',
                                }
                            }
                            onClick={handleClickFavorite}
                        />
                        ) : (
                        <FavoriteBorderIcon
                            sx={
                                {
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    margin: '16px',
                                    color: 'white',
                                    fontSize: '2rem',
                                }
                            }
                            onClick={handleClickFavorite}
                        />
                        )
                    }
                    <CardMedia
                        component={'img'}
                        image={dishProps.dishImage}
                        title={`Imagem do prato selecionado ${dishProps.dishName}`}
                        alt={`Prato selecionado ${dishProps.dishName}`}
                        {...figureProps}
                    />
                    <CardContent
                        sx={
                            {
                                padding: '12px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent:'center',
                                alignItems: 'center',
                            }
                        }
                    >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={
                            {
                                paddingBottom: '12px',
                                display: 'flex',
                                justifyContent: 'center',
                                color: theme.foodExplorer.light[100],
                            }
                        }
                    >
                        {dishProps.dishName}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={
                            {
                                margin: '0 auto',
                                textJustify: 'center',
                                color: theme.foodExplorer.light[100],
                                fontSize: '1rem',
                                textAlign: 'center',

                            }
                        }
                    >
                        {dishProps.dishDescription.summary}
                    </Typography>
                    <div
                        style={{
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '24px',
                            margin: '16px 0',
                            flexWrap: 'wrap',
                        }}
                    >
                        {dishProps.dishTags.map((tag, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                sx={
                                    {
                                        textTransform: "none",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: theme.foodExplorer.light[700],
                                        color: theme.foodExplorer.light[100],
                                        fontSize: '0.75rem',
                                        textAlign: 'center',
                                        margin: '8px 0',
                                    }
                                }
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                    {
                        hasPermission ? (
                            <>
                            <CardActions
                            sx={
                                {
                                    margin: '0 auto',
                                    padding: '0',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }
                            >
                            <Button
                                variant="contained"
                                sx={
                                    {
                                        textTransform: "none",
                                        backgroundColor: theme.foodExplorer.tints.tomato[100],
                                        color: theme.foodExplorer.light[100],
                                        width: '100%',
                                        maxWidth: '350px',
                                        margin: '24px auto 36px',
                                        padding: 'auto',
                                        fontSize: '1rem',
                                    }
                                }
                                onClick={() => navigate(`/edit-dish/${id}`)}
                            >
                                Editar prato
                            </Button>
                            </CardActions>
                            </>

                        ) : (
                            <>
                            <CardActions
                            sx={
                                {
                                    margin: '0 auto',
                                    padding: '0',
                                    width: 'fit-content',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }
                            >
                            <Button
                                sx={
                                {
                                    margin: '0',
                                    padding: '0',
                                    width: 'fit-content',
                                    color: theme.foodExplorer.light[100],
                                }
                                }
                            >
                                <RemoveIcon
                                    sx={
                                        {
                                            margin: '0',
                                            padding: '0',
                                            width: '100%',
                                            color: theme.foodExplorer.light[100],
                                            fontSize: '1rem',
                                        }
                                    }
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                />
                            </Button>
                            <Typography
                                variant="body1"
                                component="div"
                                sx={
                                {
                                    margin: '0',
                                    padding: '0',
                                    color: theme.foodExplorer.light[100],
                                    fontSize: '1rem',
                                }
                                }
                            >
                                {quantity.toString().padStart(2, '0')}
                            </Typography>
                            <Button
                                sx={
                                {
                                    color: theme.foodExplorer.light[100],
                                    fontSize: '2rem',
                                }
                                }
                            >
                                <AddIcon
                                    onClick={() => setQuantity(quantity + 1)}
                                />
                            </Button>
                            <Button
                                variant="contained"
                                sx={
                                    {
                                        textTransform: "none",
                                        backgroundColor: theme.foodExplorer.tints.tomato[100],
                                        color: theme.foodExplorer.light[100],
                                        width: 'fit-content',
                                        margin: '0',
                                        padding: 'auto',
                                        fontSize: '0.6rem',
                        
                                        gap: '4px',
                                    }
                                }
                                onClick={() => handleClickIncludeOrder(id, quantity)}
                            >
                                <ReceiptIcon
                                    sx={
                                        {
                                            color: theme.foodExplorer.light[100],
                                        }
                                    }
                                />
                                pedir - R$ {dishProps.dishPrice}
                            </Button>
                            </CardActions>
                        </>
                        )
                    }
                    </CardContent>
                    <CardActions
                        sx={
                            {
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0 16px 16px',
                            }
                        }
                    >
                        <Button
                            size="small"
                        >
                            Compartilhar
                        </Button>
                        <Button
                            title={dishProps.dishDescription.full}
                            size="small"
                        >
                            Saiba mais
                        </Button>
                    </CardActions>
                </Card>
                </>
              )
            }
                </Box>
            </S.Content>
                <Footer />
        </S.Container>
    )
}