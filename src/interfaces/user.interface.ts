interface User {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface UserPayload {
  username: string;
  classe: string;
  level: number;
}

export {
  User,
  UserPayload,
};