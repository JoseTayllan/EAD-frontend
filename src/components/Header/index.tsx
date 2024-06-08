
import {
  Avatar,
  Button,
  ClickAwayListener,
  IconButton,
  Popper
 } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeRounded from '@mui/icons-material/HomeRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import logo from '@/assets/images/empty-profile.png';

import * as S from './styles';
import { theme } from '@/styles/theme';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyImage from '../../assets/images/empty-profile.png';
import { useAuth } from '../../hooks/AuthProvider';
import { api } from '../../services/api';

import * as Utils from '@/utils/interfaces';

import { Brand } from '../Brand';
import { Menu } from './Menu';
import MenuPopperItem from './MenuPopperItem';
import { Search } from '@/components/Search';
import { ReceiptLong, Restaurant } from '@mui/icons-material';

interface HeaderProps {
  hasPermission: boolean;
  isMenuOpened: boolean;
  onClickMenu: () => void;
}

interface openOrderProps {
  dishId?: string;
  quantity?: number;
}

export function Header({
  hasPermission,
  isMenuOpened,
  onClickMenu,
}: HeaderProps) {
  const { signOut, user } = useAuth();
  const [search, setSearch] = 
  useState<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
  (null as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [anchorFunctionalitiesEl, setAnchorFunctionalitiesEl] =
    useState<null | HTMLElement>(null);
  const [anchorMessagesEl, setAnchorMessagesEl] = useState<null | HTMLElement>(
    null
  );
  const [anchorSearchEl, setAnchorSearchEl] = useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const openOrder: openOrderProps[] = 
    JSON.parse(
      localStorage.getItem('@coead-backend:openOrder')
    ? (localStorage.getItem('@coead-backend:openOrder') as string)
        : '[]'
    )
  const orderQuantity = Array.isArray(openOrder)
      ? openOrder.length
        : 1;

  const handleFunctionalitiesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFunctionalitiesEl(
      anchorFunctionalitiesEl ? null : event.currentTarget
    );
  };

  const handleMessagesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMessagesEl(anchorMessagesEl ? null : event.currentTarget);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSearchEl(anchorSearchEl ? null : event.currentTarget);
  };

  const handleFunctionalitiesClickAway = () => {
    setAnchorFunctionalitiesEl(null);
  };

  const handleMessagesClickAway = () => {
    setAnchorMessagesEl(null);
  };

  const handleSearchClickAway = () => {
    setAnchorSearchEl(null);
  };

  const openFunctionalities = Boolean(anchorFunctionalitiesEl);
  const idFunctionalities = openFunctionalities ? 'simple-popper' : undefined;

  const openMessages = Boolean(anchorMessagesEl);
  const idMessages = openMessages ? 'simple-popper' : undefined;

  const openSearch = Boolean(anchorSearchEl);
  const idSearch = openSearch ? 'simple-popper' : undefined;

  const handleSignOut = () => {
    navigate('/');
    signOut();
  };

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;

  const orderList = orderQuantity;

  const company = {
    name: 'coead',
    logoUrl: logo,
    width: 48,
    height: 48,
  };

  const searchProps = {
    placeholder: 'Busque por pratos ou ingredientes',
    style: {
      minWidth: '242px',
      maxWidth: 'calc(416px + 0.5vw)',
      height: '48px',
      padding: '36px 28px',
      marginBottom: '2rem',
    },
    handleKeyDown: handleKeyDown,
    setSearch: setSearch,
  };

  const menuProps = {
    isMenuOpened: isMenuOpened,
    onClickMenu: onClickMenu,
  }

  const dishes = (
    JSON.parse(
      localStorage.getItem('@coead-backend:dishes')
      ? (localStorage.getItem('@coead-backend:dishes') as string)
        : '[]'
    )
  );
  
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      setFilteredDishes(
        dishes.filter((dish: Utils.dishProps) =>
          dish.name?.toLowerCase().includes(search.target.value.toLowerCase())
        )
      )
    }
  }

  return (
    <S.Container>
      <S.Content>
        <Menu menuProps={menuProps}/>
          {
            isMenuOpened ? (
              <S.Profile>
                <ClickAwayListener onClickAway={handleMessagesClickAway}>
                  <IconButton
                    aria-label="messages"
                    aria-describedby={idMessages}
                    onClick={handleMessagesClick}
                    title="Mensagens"
                  >
                    <NotificationsActiveIcon />

                    <Popper
                      id={idMessages}
                      open={openMessages}
                      anchorEl={anchorMessagesEl}
                    >
                      <S.PopperContent>
                        <S.HeaderPopperContent>Mensagens</S.HeaderPopperContent>
                        <S.BodyPopperContent>
                          <MenuPopperItem
                            title="Nenhuma mensagem ..."
                            callback={() => {
                              console.log('Nenhuma mensagem');
                            }}
                          />
                        </S.BodyPopperContent>
                      </S.PopperContent>
                    </Popper>
                  </IconButton>
                </ClickAwayListener>

                <ClickAwayListener onClickAway={handleFunctionalitiesClickAway}>
                  <IconButton
                    aria-label="functionalities"
                    aria-describedby={idFunctionalities}
                    onClick={handleFunctionalitiesClick}
                    title="Funcionalidades"
                  >
                    <Avatar
                      alt={`Foto do usuário ${user.name}`}
                      sx={{ width: 26, height: 26 }}
                      src={user.avatar ? avatarUrl : undefined} // TODO: colocar url do avatar no lugar de avatarUrl
                    >
                      {user.name?.slice(0, 1)}
                    </Avatar>

                      <Popper
                        id={idFunctionalities}
                        open={openFunctionalities}
                        anchorEl={anchorFunctionalitiesEl}
                      >
                        <S.PopperContent>
                          <S.HeaderPopperContent>{user.name}</S.HeaderPopperContent>
                          <S.BodyPopperContent>
                            <MenuPopperItem
                              icon={<HomeRounded />}
                              title="Home"
                              callback={() => {
                                navigate('/');
                              }}
                            />
                            <MenuPopperItem
                              icon={<AccountBoxIcon />}
                              title="Perfil"
                              callback={() => {
                                navigate('/profile');
                              }}
                            />
                            <MenuPopperItem
                              icon={<LogoutIcon />}
                              title="Sair"
                              callback={handleSignOut}
                            />
                          </S.BodyPopperContent>
                        </S.PopperContent>
                      </Popper>
                  </IconButton>
                </ClickAwayListener>
              </S.Profile>
            ) : (
              <>
                {
                  hasPermission ? (
                    <div className='HeaderItems'>
                      <span className='EmptyElement'></span>
                      
                      <div className="Brand">
                        <Brand
                          style={{ fontSize: 21.163 }}
                          company={ company }
                        />
                      </div>

                      <div className="BrandPermission">
                        <Brand style={{ fontSize: 21.163 }} company={ company }/>
                        <span
                          style={
                            {
                              color: '#fff',
                              fontSize: '0.8rem'
                            }
                          }
                        >
                          admin
                        </span>
                      </div>

                      <div className="SearchBar">
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
                              style={
                                {
                                  minWidth: '500px',
                                  zIndex: 999,
                                }
                              }
                            >
                              <S.PopperContent>
                                <S.HeaderPopperContent>Resultados da busca</S.HeaderPopperContent>
                                <S.BodyPopperContent>
                                  {
                                    filteredDishes && filteredDishes.map((dish: Utils.dishProps) => (
                                      <MenuPopperItem
                                        key={dish.id}
                                        icon={<Restaurant />}
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
                      </div>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.coead.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/favorites`)}
                      >
                          Meus Favoritos
                      </Button>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.coead.light[100],
                              width: 'calc(316px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/new-dish`)}
                      >
                          Novo prato
                      </Button>
                      
                      <Button
                        variant="contained"
                        sx={
                            {
                              textTransform: "none",
                              backgroundColor: theme.coead.tints.tomato[100],
                              color: theme.coead.light[100],
                              width: 'calc(316px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => alert('Funcionalidade em desenvolvimento')}
                      >
                      <div
                        style={
                          {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                          }
                        }
                      >
                        <ReceiptLong />
                        <span>Pedidos ({orderList})</span>
                      </div>
                      </Button>
                      
                      <LogoutIcon
                        className='LogoutIcon'
                        cursor='pointer'
                        onClick={handleSignOut}
                      />  

                      <div className="overlap">
                        <span
                          style={{ color: '#fff', fontSize: '0.8rem' }}
                        >
                          admin
                        </span>
                      </div>
                    </ div>
                  ) : (
                    <div className='HeaderItems'>
                      <Brand style={{ fontSize: 21.163 }} company={ company }/>
                      <div className="overlap">
                        
                        <ReceiptLongIcon
                          cursor='pointer'
                          onClick={() => alert('Funcionalidade em desenvolvimento!')}
                          className='ProductsImage'
                        />
                        <span
                          onClick={() => alert('Funcionalidade em desenvolvimento!')}
                        >
                          {orderList}
                        </span>
                      </div>

                      <div className="SearchBar">
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
                              style={
                                {
                                  minWidth: '500px',
                                  maxHeight: '500px',
                                  zIndex: 999,
                                }
                              }
                            >
                              <S.PopperContent>
                                <S.HeaderPopperContent>Resultados da busca</S.HeaderPopperContent>
                                <S.BodyPopperContent>
                                  {
                                    filteredDishes && filteredDishes.map((dish: Utils.dishProps) => (
                                      <MenuPopperItem
                                        key={dish.id}
                                        icon={<Restaurant />}
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
                      </div>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.coead.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/favorites`)}
                      >
                          Meus Favoritos
                      </Button>
                      
                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.coead.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => alert('Funcionalidade em desenvolvimento!')}
                      >
                          Histórico de Pedidos
                      </Button>
                      
                      <Button
                        variant="contained"
                        sx={
                            {
                              display: 'flex',
                              textTransform: "none",
                              backgroundColor: theme.coead.tints.tomato[100],
                              color: theme.coead.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                        }
                        onClick={() => alert('Funcionalidade em desenvolvimento!')}
                    >
                      <div
                        style={
                          {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                          }
                        }
                      >
                        <ReceiptLong />
                        <span>Pedido ({orderList})</span>
                      </div>
                    </Button>

                    <LogoutIcon
                        className='LogoutIcon'
                        cursor='pointer'
                        onClick={handleSignOut}
                      />  

                    </ div>
                  )
                }
              </>
            )
          }
        </S.Content>
    </S.Container>
  );
}
