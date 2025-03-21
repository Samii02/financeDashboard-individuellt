import { useEffect, useRef, useState } from "react";

function NewsItem({ new: newsItem }) {
  const articleRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const articleElement = articleRef.current;
    if (articleElement) {
      const isOverflowing =
        articleElement.scrollHeight > articleElement.clientHeight;
      setHasOverflow(isOverflowing);
    }
  }, [newsItem]);

  const placeholderImage = "Icons/Images/no_image_placeholder.png";

  return (
    <article
      ref={articleRef}
      className={`bg-cardBg w-full my-10 m-4 p-3 box-content shadow-lg rounded-md md:w-5/12 xl:w-3/12 flex flex-col justify-between h-[400px] overflow-hidden transition-all duration-300 hover:scale-105 ease-in-out ${
        hasOverflow ? "hover:h-[500px]" : ""
      }`}
    >
      <h4 className="font-bold font-title">{newsItem.title}</h4>
      <img
        className="object-cover w-full h-40 rounded-md"
        src={newsItem.urlToImage || placeholderImage}
        alt={newsItem.title || "Placeholder Image"}
      />
      <p className="font-text">
        {newsItem.publishedAt.replace("T", " ").replace("Z", " ")}
      </p>
      <p className="font-text">{newsItem.description}</p>
      <p className="font-text">Full article:</p>
      <a
        className="italic underline break-all"
        href={newsItem.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {newsItem.url}
      </a>
    </article>
  );
}

export default NewsItem;
