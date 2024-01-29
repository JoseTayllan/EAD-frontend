import {
  ClickAwayListener,
  IconButton,
  Popper
 } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeRounded from '@mui/icons-material/HomeRounded';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';

import * as S from './styles';
import { Search } from '../Search';
import { Section } from '../Sidebar/Section';
import { Item } from '../Sidebar/Item';
import MenuPopperItem from '../Header/MenuPopperItem';

import { useAuth } from '../../hooks/AuthProvider';

import * as Utils from '@/utils/interfaces';

import { useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

interface MenuProps {
    isOpened: boolean;
}

export function Menu(props: MenuProps) {
    const location = useLocation();
    const { signOut, user } = useAuth();
    const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
    const [activeItem, setActiveItem] = useState<string>('');

    const [search, setSearch] = 
    useState<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    (null as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [anchorSearchEl, setAnchorSearchEl] = useState<null | HTMLElement>(
      null
    );
  
    const navigate = useNavigate();

    const searchProps = {
      placeholder: 'Busque por pratos ou ingredientes',
      style: {
        height: '48px',
        padding: '36px 28px',
        marginBottom: '2rem',
      },
      handleKeyDown: handleKeyDown,
      setSearch: setSearch,
    };
  
    const dishes = (
      JSON.parse(
        localStorage.getItem('@food-explorer-backend:dishes')
        ? (localStorage.getItem('@food-explorer-backend:dishes') as string)
          : '[]'
      )
    );
    
    const items = hasPermission
      ? [
          {
            title: 'Home',
            icon: <HomeRounded />,
            navigateTo: '/',
          },
          {
            title: 'Novo Prato',
            icon: <RestaurantIcon />,
            navigateTo: '/new-dish',
          },
          {
            title: 'Meus Favoritos',
            icon: <ThumbUpAltIcon />,
            navigateTo: '/favorites',
          },
          {
            title: 'Calendário',
            icon: <CalendarMonthIcon />,
            navigateTo: '/calendar',
          },
          {
            title: 'Blog',
            icon: <BookIcon />,
            navigateTo: 'https://github.com/jakunzler',
          },
          {
            title: 'Usuários',
            icon: <GroupIcon />,
            navigateTo: '/users',
          },
          {
            title: 'Sair',
            icon: <ExitToAppIcon />,
            navigateTo: '/signout',
          },
        ]
      : [
          {
            title: 'Home',
            icon: <HomeRounded />,
            navigateTo: '/',
          },
          {
            title: 'Meus Favoritos',
            icon: <ThumbUpAltIcon />,
            navigateTo: '/favorites',
          },
          {
            title: 'Meus Pedidos',
            icon: <ListAltIcon />,
            navigateTo: '/orders',
          },
          {
            title: 'Calendário',
            icon: <CalendarMonthIcon />,
            navigateTo: '/calendar',
          },
          {
            title: 'Blog',
            icon: <BookIcon />,
            navigateTo: 'https://github.com/jakunzler',
          },
          {
            title: 'Sair',
            icon: <ExitToAppIcon />,
            navigateTo: '/signout',
          },
        ];
  
    interface HandleProps {
        navigateTo: string;
    }
  
    const handleClick = ({ navigateTo }: HandleProps) => {
      setActiveItem(navigateTo);
  
      if (navigateTo.startsWith('http')) {
        window.open(navigateTo, '_blank');
      } else if (navigateTo === '/signout') {
        signOut();
      } else if (navigateTo === '/orders'){
        alert('Funcionalidade em desenvolvimento!');
      } else {
        navigate(navigateTo);
      }
    };
    
    const handleChangeSettings = () => {
      navigate('/settings');
    };
  
    const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorSearchEl(anchorSearchEl ? null : event.currentTarget);
    };
  
    const handleSearchClickAway = () => {
      setAnchorSearchEl(null);
    };
  
    const openSearch = Boolean(anchorSearchEl);
    const idSearch = openSearch ? 'simple-popper-menu' : undefined;
  
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'Enter') {
        setFilteredDishes(
          dishes.filter((dish: Utils.dishProps) =>
            dish.name?.toLowerCase().includes(search.target.value.toLowerCase())
          )
        )
      }
    }

    useEffect(() => {
      setActiveItem(location.pathname);
    }, [location.pathname]);
  
    return (
        <S.Container>
            <S.Content>
                <ClickAwayListener onClickAway={handleSearchClickAway}>
                  <IconButton
                    aria-label="search"
                    aria-describedby={idSearch}
                    onClick={handleSearchClick}
                    title="Filtragem"
                  >
                    <Search
                      searchProps={searchProps}
                    />

                    <Popper
                      id={idSearch}
                      open={openSearch}
                      anchorEl={anchorSearchEl}
                    >
                      <S.PopperContent>
                        <S.HeaderPopperContent>Resultados da busca</S.HeaderPopperContent>
                        <S.BodyPopperContent>
                          {
                            filteredDishes && filteredDishes.map((dish: Utils.dishProps) => (
                              <MenuPopperItem
                                key={dish.id}
                                icon={<RestaurantIcon />}
                                title={dish?.name || 'Sem nome'}
                                callback={() => {
                                  navigate(`/dish/${dish.id}`);
                                }}
                              />
                            ))
                          }
                        </S.BodyPopperContent>
                      </S.PopperContent>
                    </Popper>
                  </IconButton>
                </ClickAwayListener>

                <S.ItemsContainer>
                {items.map((item, index) => {
                    return (
                    <Item
                        id={`bar_item_${index}`}
                        key={index}
                        onClick={() => handleClick(item)}
                        content={item.title}
                        icon={item.icon}
                        isActive={item.navigateTo === activeItem}
                        isOpenedSidebar={props.isOpened}
                    />
                    );
                })}
                </S.ItemsContainer>
                <Section />
                <S.Footer>
                <Item
                    id={`bar_item_settings`}
                    onClick={handleChangeSettings}
                    content={'Configurações'}
                    icon={<SettingsIcon />}
                    isActive={'/settings' === activeItem}
                    isOpenedSidebar={props.isOpened}
                />
                </S.Footer>
            </S.Content>
        </S.Container>
    );
}