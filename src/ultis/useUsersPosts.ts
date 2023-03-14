
import { IUserBookCategoriesPublic } from '@/types/data/Users';
import { useEffect, useState } from 'react';
import requestParameters from './requestParameters';

export default function useUsersPosts() {
  const [usersPosts, setUsersPosts]= useState<IUserBookCategoriesPublic[]>([]);
  type TIDUserPosts= {
    id: number,
    book: number[]
  };
  const [iDsUsersPosts, setIDsUsersPosts]= useState<TIDUserPosts[]>([]);
  
  useEffect(() => {
    (async () => {
      const requestUsersPosts= await fetch('/api/users/posts/random', {
        ...requestParameters.json,
        body: JSON.stringify({
          iDs: iDsUsersPosts
        })
      });
      const responseUsersPosts= await requestUsersPosts.json();
      setUsersPosts(await responseUsersPosts);
    })();
  }, []);
  
  useEffect(() => {
    console.log(usersPosts);
    setIDsUsersPosts((oldIDsUsersPosts: TIDUserPosts[] | any)=> {
      return [...(usersPosts.length>0 ? 
        usersPosts.map(userPosts=> {
          let { id, book: book_primary } = userPosts;
          const book: number[]= book_primary.map(book=> book.id);
          return ({ id, book});
        })
      : []), ...oldIDsUsersPosts]
    });
  }, [usersPosts]);

  return { usersPosts };
}