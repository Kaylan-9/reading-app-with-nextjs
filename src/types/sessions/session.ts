import { DefaultSession } from 'next-auth';

export default interface Session {
  user: {
    id: string
  } & DefaultSession['user']
}