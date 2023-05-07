
import { createContext, useContext, useState } from "react";

export interface IArticle {
  id: string;
  // this is the list of purchased paragraphs
  paragraphs: string[];
  hasPurchasedFullArticle: boolean;
}
interface IArticleContext {
  articles: { [key: string]: IArticle };
  addArticle: (article: IArticle) => IArticle | undefined;
  addParagraph: (articleId: string, paragraph: string) => void;
  getArticleById: (id: string) => IArticle | undefined;
  setHasPurchasedFullArticle: (articleId: string) => void;
}

export const ArticleContext = createContext<IArticleContext>({
  articles: {},
  addArticle: () => undefined,
  addParagraph: () => { },
  getArticleById: () => undefined,
  setHasPurchasedFullArticle: () => { },
});


function ArticleProvider(props: any) {
  const [articles, setArticles] = useState<IArticleContext["articles"]>({});

  function addArticle(article: IArticle) {
    if (articles[article.id]) {
      return articles[article.id];
    }
    articles[article.id] = article;
    setArticles({ ...articles });
  }
  function getArticleById(id: string) {
    if (!articles[id]) {
      addArticle({ id, paragraphs: [], hasPurchasedFullArticle: false });
    }
    return articles[id];
  }
  function addParagraph(articleId: string, paragraph: string) {
    setArticles({
      ...articles,
      [articleId]: {
        ...articles[articleId],
        paragraphs: [...articles[articleId].paragraphs, paragraph],
      },
    });
  }
  function setHasPurchasedFullArticle(articleId: string) {
    setArticles({
      ...articles,
      [articleId]: {
        ...articles[articleId],
        hasPurchasedFullArticle: true,
      },
    });
  }

  const articleData = { articles, addArticle, addParagraph, getArticleById, setHasPurchasedFullArticle };

  return <ArticleContext.Provider value={articleData} {...props} />;
}

function useArticleContext() {
  return useContext(ArticleContext);
}

export { ArticleProvider, useArticleContext };