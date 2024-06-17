import {
  Box,
  // Card,
  Container, Grid,
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
import myImage from '../../assets/images/Em Busca de Heróis.jpg';
import myImage1 from '../../assets/images/Adrenaline.jpg';
import myImage2 from '../../assets/images/podcas.jpg'
import myImage3 from '../../assets/images/Segurança.jpg'
import myImage4 from '../../assets/images/A revolta.jpg'
import myImage5 from '../../assets/images/Lgpd.jpg'


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
  const [showDevelopmentMessage, setShowDevelopmentMessage] = useState(false);

 function handleClickEbook() {
  setShowDevelopmentMessage(true);
  setTimeout(() => setShowDevelopmentMessage(false), 3000); // Oculta a mensagem após 3 segundos
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
                 {showDevelopmentMessage && (
                   <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -10%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '10px 20px', borderRadius: '5px', zIndex: 1000 }}>
                       Funcionalidade em desenvolvimento
                  </div>
                 ) }
           <span style={{ height: '10px' }}></span>
              {!hasPermission && <AppSection title="Favoritos" />}
              <Grid container spacing={1} sx={{ marginTop: '-50px', justifyContent: 'flex-start' }}>
                <Grid item sx={{ padding: 0, textAlign: 'center', width: '17%' }}>
                   <h3 style={{ color: '#09d6d3' }}> Livro </h3>
                    <a href="https://www.kobo.com/br/pt/ebook/em-busca-de-herois-livro-1-o-anel-do-feiticeiro" target="_blank" rel="noopener noreferrer">
                      <img src={myImage} alt="Descrição da imagem" style={{ width: '100%', height: 'auto' }} /> 
                    </a>
                    <h3> Em Busca de Herois </h3>
                   <h6 style={{ color: '#bdab08' }}>Gratuito</h6>
                </Grid>
                <Grid item sx={{ padding: 0, textAlign: 'center', width: '30%' }}>
                   <h3 style={{ color: '#09d6d3' }}> Podcast </h3>
                  <iframe
                    width="100%"
                    height="auto"
                    src="https://www.youtube.com/embed/fis26HvvDII"
                    title="The Future of Technology: A Look Ahead"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                    <h3>The Future of Technology: A Look Ahead</h3>
                </Grid>
                <Grid item sx={{ padding: 0, textAlign: 'center', width: '24%' }}>
                <h3 style={{ color: '#09d6d3' }}> Fórun </h3>
                  <a href="https://forum.adrenaline.com.br/threads/legacy-update-reviva-o-passado-com-a-tecnologia-do-futuro.712870/" target="_blank" rel="noopener noreferrer">
                    <img src={myImage1} alt="Descrição da imagem" style={{ width: '100%', height: 'auto' }} /> 
                  </a>
                   <h3> Fórun Adrenaline </h3>
                </Grid>
                <Grid item sx={{ padding: 0, textAlign: 'center', width: '24%' }}>
                <h3 style={{ color: '#09d6d3' }}> Podcast </h3>
                  <a href="https://youtu.be/4nepEd9BxPs?si=CjI5ZDXYIiWsTZGG" target="_blank" rel="noopener noreferrer">
                    <img src={myImage2} alt="Descrição da imagem" style={{ width: '100%', height: 'auto' }} /> 
                  </a>
                  <h3> PrimoTech 13 </h3>
                  </Grid> 
                  <Grid item sx={{ padding: 0, textAlign: 'center', width: '17%' }}>
                    <h3 style={{ color: '#09d6d3' }}> Livro </h3>
                    <a onClick={handleClickEbook}>
                      <img src={myImage4} alt="Livro Compra" style={{ width: '100%', height: 'auto' }} /> 
                    </a>
                    <h3> Compre o eBook</h3>
                    <h6 style={{ color: '#bdab08' }}>Seu preço </h6> <h4 style={{ color: '#fff700' }}>R$ 64,99</h4> 
                    </Grid>
                  <Grid item sx={{ padding: 0, textAlign: 'center', width: '17%' }}>
                   <h3 style={{ color: '#09d6d3' }}> Curso </h3>
                  <a href="https://www.ev.org.br/cursos/seguranca-em-tecnologia-da-informacao" target="_blank" rel="noopener noreferrer">
                    <img src={myImage3} alt="Descrição da imagem" style={{ width: '100%', height: 'auto' }} /> 
                  </a>
                     <h3> Matricule-se Agora  </h3>
                        <h6 style={{ color: '#bdab08' }}>Gratuito</h6>
                </Grid>
                <Grid item sx={{ padding: 0, textAlign: 'center', width: '17%' }}>
                    <h3 style={{ color: '#09d6d3' }}> Livro </h3>
                    <a onClick={handleClickEbook}>
                      <img src={myImage5} alt="Livro Compra" style={{ width: '100%', height: 'auto' }} /> 
                    </a>
                        <h3> Compre o eBook</h3>
                         <h6 style={{ color: '#bdab08' }}>Seu preço </h6> <h4 style={{ color: '#fff700' }}>R$ 133,00</h4> 
                    </Grid>
                    
              </Grid>
              {categories.map((category, index) => (
                <AppSection key={index} title={category.name} />
              ))}
            </Container>
          )}
        </Box>
      </S.Content>
      <Footer />
    </S.Container>
  );
}
