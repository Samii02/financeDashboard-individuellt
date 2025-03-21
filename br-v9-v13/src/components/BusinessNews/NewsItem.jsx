function NewsItem({ new: newsItem }) {
  return (
    <article className="  hover:scale-125 bg-cardBg w-full my-10 m-4 p-3 box-content shadow-lg  rounded-md md:w-5/12 xl:w-3/12">
      <h4 className=" font-bold font-title">{newsItem.title}</h4>
      <img className="" src={newsItem.urlToImage} alt={newsItem.title} />
      <p className="font-text">
        {newsItem.publishedAt.replace("T", " ").replace("Z", " ")}
      </p>
      <p className="font-text">{newsItem.description}</p>
      <p>Full article: </p>
      <a
        className="italic underline"
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
