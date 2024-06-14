import {
  Box,
  // Card,
  Container,
  // IconButton,
  // Tooltip,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AppSection } from '../../components/AppSection';
import { Menu } from '../../components/Menu';

import { api } from '@/services/api';

import * as S from './styles';
import * as Utils from '../../utils/interfaces';

import { useAuth } from '../../hooks/AuthProvider';

export function Home() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [categories, setCategories] = useState<Utils.categoryProps[]>(
    JSON.parse(
      localStorage.getItem('@coead-backend:categories')
        ? (localStorage.getItem('@coead-backend:categories') as string)
        : '[]'
    )
  );
  const courses = (
    JSON.parse(
      localStorage.getItem('@coead-backend:courses')
      ? (localStorage.getItem('@coead-backend:courses') as string)
        : '[]'
    )
  );
  
  const [openOrder, setOpenOrder] = useState<Utils.openOrderProps[]>(
    JSON.parse(
      localStorage.getItem('@coead-backend:openOrder')
    ? (localStorage.getItem('@coead-backend:openOrder') as string)
        : '[]'
    )
  );
  const [favorites, setFavorites] = useState<Utils.courseProps[]>([]);
  // const [isShowHints, setIsShowHints] = useState<boolean>(false);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleClickFavorite(courseId: string | undefined) {
    const isFavorite = favorites && favorites.find((course) => course.id === courseId);
    if (isFavorite) {
      const removeFavorite = isFavorite
      const remainingFavorites = favorites.filter((course) => course.id !== courseId)

      if (removeFavorite) {
        const values = {
          userId: user.id,
          courseId: removeFavorite.id,
        }
        api.patch(`favorite/`, values).then(() => {
          setFavorites(remainingFavorites)
          localStorage.setItem('@coead-backend:favorites', JSON.stringify(remainingFavorites))
        }).catch((error) => {
          console.error(error)
          alert("Não foi possível realizar operação")
        });
      }
    } else {
      const addFavorite = courses.find((course: Utils.courseProps) => course.id === courseId)
      if (addFavorite) {
        const values = {
          userId: user.id,
          courseId: addFavorite.id,
        }
        api.patch(`favorite/`, values).then(() => {
          setFavorites([...favorites, addFavorite])
          localStorage.setItem('@coead-backend:favorites', JSON.stringify([...favorites, addFavorite]))
        }).catch((error) => {
          console.error(error)
          alert("Não foi possível realizar operação")
        });
      }
    }
  }

  function handleClickIncludeOrder(courseId: string | undefined, quantity: number) {
    const isOpenOrderArray = Array.isArray(openOrder);

    if (isOpenOrderArray) {
      setOpenOrder([
        ...openOrder,
        {
          courseId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@coead-backend:openOrder',
        JSON.stringify([
          ...openOrder,
          {
            courseId,
            quantity
          }
        ]))
        );
    } else {
      setOpenOrder([
        openOrder,
        {
          courseId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@coead-backend:openOrder',
        JSON.stringify([
          openOrder,
          {
            courseId,
            quantity
          }
        ]))
      );
    }
  }

  useEffect(() => {
    const userFavorites = JSON.parse(
      localStorage.getItem('@coead-backend:favorites')
        ? (localStorage.getItem('@coead-backend:favorites') as string)
        : '[]'
    );
    if (userFavorites) {
      setFavorites(
        userFavorites
      );
    } else {
      setFavorites([]);
    }
  }, []);

  // useEffect(() => {
  //   api.get('category/')
  //  .then((response) => {
  //       setCategories(response.data);
  //       localStorage.setItem('@coead-backend:categories', JSON.stringify(response.data));
  //     })
  // }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpened(false);
    }
  }, [isDesktop]);

  return (
      <S.Container
        $opened={isSideBarOpened}
        style={
          {
            display: 'flex',
            flexDirection: 'column',
          }
        }
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
        
        <S.Content
          $opened={isMenuOpened}
          style={
            {
              flex: 1,
            }
          }
        >
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
                <Menu isOpened={isMenuOpened} />
              ) : (
                <Container
                  fixed
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ height:'40px'}}></span>
                  {
                    !hasPermission &&
                      <AppSection title="Favoritos">
                        
                      </AppSection>
                    }
                    {
                      categories.map((category: Utils.categoryProps, index: number) => {
                        return (
                        <AppSection key={index} title={category.name} >
                        </AppSection>
                        )
                      })
                    }
                </Container>
              )
            }

          </Box>
        </S.Content>
        <Footer/>
      </S.Container>
  );
}
