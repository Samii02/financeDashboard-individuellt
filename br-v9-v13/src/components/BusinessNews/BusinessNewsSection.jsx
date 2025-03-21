import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../Reducers/NewsAPISlice";
import NewsItem from "./NewsItem";

function BusinessNewsSection() {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  // Add defensive checks before accessing the news data
  if (loading) return <p>Loading news</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news) {
    return (
      <p className="w-full text-center text-3xl md:text-4xl font-bold">
        No economic news available.
      </p>
    );
  }

  return (
    <section className="flex flex-row flex-wrap justify-center items-start">
      <h3 className="w-full text-center text-3xl md:text-4xl font-bold font-title">
        The latest news in economy
      </h3>
      {news.articles.length > 0 ? (
        news.articles.map((newsItem) => (
          <NewsItem key={newsItem.index} new={newsItem} />
        ))
      ) : (
        <h4 className="w-full text-center text-3xl md:text-4xl font-bold font-text">
          could not find the news you are looking for
        </h4>
      )}
    </section>
  );
}

export default BusinessNewsSection;
