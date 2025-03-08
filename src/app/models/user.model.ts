export interface User {
  id : string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'ORGANIZER';
  sex: 'MALE' | 'FEMALE';
  username: string;
}

