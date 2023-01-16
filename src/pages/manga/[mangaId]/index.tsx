import { useRouter } from 'next/router';

export default function Manga() {
  const router = useRouter();
  const { mangaId } = router.query;

  return (<div>
    {mangaId}
  </div>)
}