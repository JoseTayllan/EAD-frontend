
export interface userProps {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface updateUserProps {
  userProfile: {
    name?: string | undefined;
    email?: string | undefined;
    oldPassword?: string | undefined;
    newPassword?: string | undefined;
    birthday?: string | undefined;
    homePhone?: string | undefined;
    workPhone?: string | undefined;
    mobilePhone?: string | undefined;
    isActive?: boolean;
    deletedBy?: string | undefined;
  };
  avatarFile?: File | null;
}

export interface SidebarProps {
  hasPermission: boolean;
}

export interface categoryProps {
  id?: string;
  name?: string;
  description?: string;
  courses: {
    id?: string;
    courseId?: string;
    categoryId?: string;
    course: courseProps;
  }[];
}

export interface courseCategoryProps {
  id?: string;
  courseId?: string;
  categoryId?: string;
  course: courseProps;
}

export interface courseProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  status?: string;
  ingredients?: string;
  summary_description?: string;
  full_description?: string;
  price?: string;
  image?: string;
  restaurantId?: string;
  isActive?: boolean;
  categories?: {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    categoryId?: string;
    category?: {
      id?: string;
      createdAt?: string;
      updatedAt?: string;
      name?: string;
      description?: string;
    }
  },
}

export interface editCourseProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  status?: string;
  ingredients?: string[];
  summary_description?: string;
  full_description?: string;
  price?: string;
  image?: string;
  restaurantId?: string;
  category?: string;
}

export interface openOrderProps {
  courseId?: string;
  quantity?: number;
}

export interface categoryProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
}

export interface favoriteCourseProps {
  id?: number;
  userId?: string;
  courseId?: number;
}

export interface restaurantsProps {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  cnpj?: string;
  isActive?: boolean;
}