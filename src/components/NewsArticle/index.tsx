import React, { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="card">
    <img src={article.imageUrl} alt={article.title} />
    <div className="card-content">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  </div>
);

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-04-03&sortBy=publishedAt&apiKey=${
            import.meta.env.NEWS_API
          }`
        );
        const data = await response.json();
        console.log(data);
        if (data.articles) {
          setArticles(
            data.articles.map((article: any) => ({
              title: article.title,
              description: article.description,
              url: article.url,
              imageUrl: article.urlToImage,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-app">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsApp;
