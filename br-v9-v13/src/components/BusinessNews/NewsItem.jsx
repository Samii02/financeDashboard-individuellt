import { useEffect, useRef, useState } from "react";

// NewsItem component that displays individual news article details
function NewsItem({ new: newsItem }) {
  // Create a reference to the article element
  const articleRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // *useEffect hook to handle side effects, particularly checking for overflow
  useEffect(() => {
    // Function to check if the content overflows the article container
    const checkOverflow = () => {
      const articleElement = articleRef.current; //* Get the article element using the reference
      if (articleElement) {
        setHasOverflow(
          //* Set state to true if the content overflows (scrollHeight > clientHeight)
          articleElement.scrollHeight > articleElement.clientHeight
        );
      }
    };

    // Calling the checkOverflow function with a slight delay (50ms)
    setTimeout(checkOverflow, 50);
    // Adding an event listener to check overflow on window resize
    window.addEventListener("resize", checkOverflow);

    // Selecting all images inside the article and adding an event listener to check overflow when images load
    const images = articleRef.current?.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("load", checkOverflow));

    // Cleanup function to remove event listeners when the component is unmounted or updated
    return () => {
      window.removeEventListener("resize", checkOverflow);
      images?.forEach((img) => img.removeEventListener("load", checkOverflow));
    };
  }, [newsItem?.title, newsItem?.description, newsItem?.publishedAt]);

  // Placeholder image for cases where the news item does not have an image
  const placeholderImage = "Icons/Images/no_image_placeholder.png";

  // Return the JSX structure for displaying the news item
  return (
    <article
      ref={articleRef}
      className={`bg-cardBg w-full md:text-[16px] lg:text-[20] my-10 m-4 p-3 box-content shadow-lg rounded-md md:w-5/12 xl:w-3/12 flex flex-col justify-between h-[400px] overflow-hidden transition-all duration-300 hover:scale-105 ease-in-out ${
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
        aria-label="external link to article"
      >
        {newsItem.url}
      </a>
    </article>
  );
}

export default NewsItem;
