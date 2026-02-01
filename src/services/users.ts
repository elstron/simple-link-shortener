import { getContext } from "hono/context-storage"
import { Env } from "../types";

type User = {
    id?: string;
    username: string;
    email: string;
    passwordHash?: string;
    role?: 'user' | 'admin';
}

export const createUser = async (user: User) => {
  const { env } = getContext<Env>();
  const uuid = crypto.randomUUID();

  const res = await env.DB.prepare(
    `INSERT INTO users (id, username, email, password_hash, verified)
     VALUES (?, ?, ?, ?, 1) ON CONFLICT(email) DO NOTHING`
  )
  .bind(
    uuid,
    user.username,
    user.email,
    user.passwordHash,
  )
  .run();

  const { passwordHash , ...rest } = user;

  if (res.meta.changes === 1) return { ...rest, id: uuid, role: 'user' } as User;

  const existingUser = await env.DB.prepare(
    `
    SELECT 
        users.id AS id, 
        users.username AS username, 
        users.first_name AS firstName, 
        users.last_name AS lastName, 
        users.email AS email, 
        roles.name AS role,
        users.created_at AS createdAt
     FROM 
      users
    INNER JOIN roles ON users.role_id = roles.id
    WHERE email = ?`
  )
  .bind(user.email)
  .first();

  if (existingUser) return existingUser as User;

  return null;

};


export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { env } = getContext<Env>();

  const user = await env.DB.prepare(
    `SELECT username, first_name AS firstName, last_name AS lastName, email, password_hash AS passwordHash, created_at AS createdAt
     FROM users WHERE email = ?`
  )
  .bind(email)
  .first();

  return user as User || null;
}
