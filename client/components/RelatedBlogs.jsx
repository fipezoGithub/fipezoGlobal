import Link from "next/link";
import React, { useEffect, useState } from "react";

const RelatedBlogs = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/blog`);
        const blogs = await res.json();
        const shuffle = shuffleArray(blogs);
        setRelatedBlogs(shuffle);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBlogs();
  }, []);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  const viewCount = async (id) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/blog/viewcount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const view = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Related Posts</h3>
      {relatedBlogs.slice(0, 6).map((item, index) => (
        <Link
          href={`/resources/details/${item.uid}`}
          onClick={() => viewCount(item._id)}
          key={index}
          className="my-4 block text-lg hover:text-blue-600"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default RelatedBlogs;
