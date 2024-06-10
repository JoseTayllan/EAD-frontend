import {
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import TourIcon from '@mui/icons-material/EmojiObjects';

import * as S from './styles';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

import { Brand } from '../../../components/Brand';
import { Input } from '../../../components/Input';

import * as Utils from '../../../utils/interfaces';

import { theme } from '../../../styles/theme';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/logos/Logo-EAD.png';

export function Login() {
  const { signIn } = useAuth();
  const [isStartTour, setIsStartTour] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const company = {
    name: 'EAD System',
    logoUrl: logo,
    width: 550,
    height: 450,
  };

  const state = {
    stepsEnabled: isStartTour,
    initialStep: 0,
    steps: [
      {
        title: 'Bem vindo!',
        intro:
          'Seja bem vindo ao:<br><br>Sistema Digital de Gerenciamento de Restaurantes desenvolvido por <br><br> Jonas Augusto Kunzler.',
      },
      {
        title: 'Acesso',
        intro:
          'Para acessar o sistema, você deve inserir o seu email e senha cadastrados. <br> <br> O padrão para administrador é: <br>Email: admin@email.com;<br>Senha: 123456. <br><br> O padrão para cliente é: <br>Email: user@email.com;<br>Senha: 123456. <br><br> Aproveite!',
      },
    ],
    // hintsEnabled: isShowHints,
    hintsEnabled: false,
    hints: [
      {
        element: '#help_tour',
        hint: 'Dica valiosa',
      },
    ],
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Insira um email válido')
      .required('É necessário inserir o seu email'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('É necessário inserir a sua senha'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: Utils.userProps) => {
      try {
        signIn(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  function onExit() {
    setIsStartTour(false);
  }

  return (
    <S.Container>
    <style>{`
      .customTooltip {
        color: #4a4a4a;
        font-size: 18px;
      }

      .customTooltip .introjs-tooltiptext {
        max-width: fit-content;
      }

      .customTooltip .introjs-tooltip-title {
        color: #0a41c9;
      }
    `}</style>
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '20px',
        zIndex: 1000,
      }}
    >
      <Tooltip title="Antes de começar" placement="top">
        <IconButton
          onClick={() => {
            setIsStartTour(true);
            // setIsShowHints(true);
          }}
          color="primary"
        >
          <TourIcon id="help_tour" style={{ fontSize: '64px' }} />
        </IconButton>
      </Tooltip>
    </div>

    <Steps
      enabled={state.stepsEnabled}
      steps={state.steps}
      initialStep={state.initialStep}
      onExit={() => onExit()}
      options={{
        showProgress: false,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        nextLabel: 'seguir',
        prevLabel: 'voltar',
        // skipLabel: 'Skip',
        hidePrev: true,
        doneLabel: 'pronto',
        overlayOpacity: 0.5,
        overlayColor: '#000',
        showStepNumbers: true,
        keyboardNavigation: true,
        scrollToElement: true,
        helperElementPadding: 10,
        showButtons: true,
        tooltipClass: 'customTooltip',
      }}
    />

    <Hints enabled={state.hintsEnabled} hints={state.hints} />

      <S.Content>
        <S.BrandCard >
          <Brand
            style={
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 37.243,
              }
            }
            company={ company }
          />
        </S.BrandCard>
        <S.FormCard >
          <S.Form
            onSubmit={formik.handleSubmit}
          >
            <h1
              style={
                {
                  color: theme.coead.light[100],
                  fontSize: 32,
                  fontWeight: 500,
                  marginBottom: 24,
                  textAlign: 'center',
                }
              }
            >
              Faça login
            </h1>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email?.toString()}
              autoFocus
              required
              id="email"
              label="Email"
              placeholder='Exemplo: exemplo@exemplo.com.br'
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.password}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              id="password"
              label="Senha"
              type="password"
              placeholder='No mínimo 6 caracteres'
            />
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              style={
                { 
                  backgroundColor: theme.coead.tints.tomato[100], 
                  textTransform: 'none',
                }
              }
            >
              Entrar
            </Button>
            <Button
              fullWidth
              size="small"
              variant="text"
              onClick={() => navigate('/signup')}
              style={
                { 
                  color: theme.coead.light[100],
                  textTransform: 'none',
                }}
            >
              Criar uma conta
            </Button>
          </S.Form>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
}
