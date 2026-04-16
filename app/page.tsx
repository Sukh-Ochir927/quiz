import { CreateArticle } from "./_components/CreateArticle";
import { getArticles } from "./lib/articles/get-article";

export default async function Home() {
  const articles = await getArticles();
  console.log("get articles: =====. :", articles);

  return (
    <div>
      <CreateArticle />
    </div>
  );
}
