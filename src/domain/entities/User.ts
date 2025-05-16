// User entity definition
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string; // Path to avatar image
  createdAt: Date;
}
