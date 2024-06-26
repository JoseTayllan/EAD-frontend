import { createContext, useContext, useState, useEffect } from 'react';

import axios from 'axios';

import { api } from '../services/api';

import * as Utils from '../utils/interfaces';

export type AuthContextType = {
  signIn: (credentials: Utils.userProps) => void;
  signOut: () => void;
  user: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    birthday?: string;
    telephone?: [
      {
        id?: string;
        type?: string;
        number?: string;
      }
    ];
    message?: [
      {
        id?: string;
        title?: string;
        content?: string;
        type?: string;
      }
    ];
    deliveryAddress?: [
      {
        id?: string;
        street?: string;
        number?: string;
        complement?: string;
        sector?: string;
        city?: string;
        state?: string;
        country?: string;
        zipcode?: string;
        latitude?: string;
        longitude?: string;
      }
    ];
    userRestaurant?: [
      {
        id?: string;
        userId?: string;
        restaurantId?: string;
      }
    ];
    orders?: [
      {
        id?: string;
        createdAt?: string;
        updatedAt?: string;
        description?: string;
        status?: string;
        totalAmount?: string;
        userId?: string;
        restaurantId?: string;
        courses?: [
          {
            id?: string;
            name?: string;
            price?: string;
            notes?: [
              {
                id?: string;
                content?: string;
                score?: string;
              }
            ]
          }
        ];
      }
    ];
    userFavoriteCourses?: [
      {
        id?: string;
        userId?: string;
        courseId?: string;
      },
    ];
    permissionGroup?: {
      id: string;
      role: string;
    };
    token?: string;
  };
  updateProfile: ({ userProfile, avatarFile }: Utils.updateUserProps) => void;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: {},
  updateProfile: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState({});

  const signIn = async ({ email, password }: Utils.userProps) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const {
        categories,
        restaurants,
        currentUser,
        permissions,
        courses,
        orders,
        tokenData,
      } = response.data;
      const user = { ...currentUser, ...permissions[0] };
      const coursesList = courses ?? [];

      localStorage.setItem(
        '@coead-backend:categories',
        JSON.stringify(categories ? categories : [])
      );
      localStorage.setItem(
        '@coead-backend:restaurants',
        JSON.stringify(restaurants ? restaurants : [])
      );
      localStorage.setItem(
        '@coead-backend:courses',
        JSON.stringify(coursesList ? coursesList : [])
      );
      localStorage.setItem(
        '@coead-backend:orders',
        JSON.stringify(orders ? orders : [])
      );
      if (user.userFavoritecourses) {
        const favoritesList: Utils.courseProps[] = user.userFavoriteCourses.map((item: Utils.favoriteCourseProps) => {
          return coursesList.find((course: Utils.courseProps) => course.id === item.courseId);
        })
        localStorage.setItem('@coead-backend:favorites', JSON.stringify(favoritesList ? favoritesList.filter((favorite) => favorite !== undefined) : []));
      }
      localStorage.setItem('@coead-backend:token', tokenData.token);
      localStorage.setItem('@coead-backend:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = tokenData.token;
      setData({ ...user, token: tokenData.token });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível entrar');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('@coead-backend:categories');
    localStorage.removeItem('@coead-backend:restaurants');
    localStorage.removeItem('@coead-backend:courses');
    localStorage.removeItem('@coead-backend:orders');
    localStorage.removeItem('@coead-backend:openOrder');
    localStorage.removeItem('@coead-backend:editingCourse');
    localStorage.removeItem('@coead-backend:visualizedCourse');
    localStorage.removeItem('@coead-backend:restaurants');
    localStorage.removeItem('@coead-backend:restaurant');
    localStorage.removeItem('@coead-backend:permissions');
    localStorage.removeItem('@coead-backend:token');
    localStorage.removeItem('@coead-backend:users');
    localStorage.removeItem('@coead-backend:user');
    localStorage.removeItem('@coead-backend:favorites');

    setData('');
  };

  const updateProfile = async ({
    userProfile,
    avatarFile,
  }: Utils.updateUserProps) => {
    try {
      const token = localStorage.getItem('@coead-backend:token');
      const user = localStorage.getItem('@coead-backend:user');
      if (user) {
        const userInfo = JSON.parse(user);

        if (avatarFile) {
          const fileUploadForm = new FormData();
          fileUploadForm.append('avatar', avatarFile);

          const response = await api.patch(
            `/user/avatar/${userInfo.id}`,
            fileUploadForm
          );
          userInfo.avatar = response.data.avatar;
        }

        await api.put(`/user/${userInfo.id}`, userProfile);

        userInfo.name = userProfile.name ? userProfile.name : userInfo.name;
        userInfo.email = userProfile.email ? userProfile.email : userInfo.email;

        localStorage.setItem(
          '@coead-backend:user',
          JSON.stringify(userInfo)
        );
        setData({ ...userInfo, token });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível entrar');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@coead-backend:token');
    const user = localStorage.getItem('@coead-backend:user');
    if (user) {
      const userInfo = JSON.parse(user);

      if (token && user) {
        api.defaults.headers.common['Authorization'] = token;

        setData({ ...userInfo, token });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth,
}