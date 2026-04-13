import { CreateArticle } from "./_components/CreateArticle";

export default async function Home() {
  // const articles = await prisma.article.findMany();

  return (
    <div>
      <CreateArticle />
    </div>
  );
}
