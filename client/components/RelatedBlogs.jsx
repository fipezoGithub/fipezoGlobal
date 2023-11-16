import Link from "next/link";
import React, { useEffect, useState } from "react";

const RelatedBlogs = () => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/blog`);
        const blogs = await res.json();
        setRelatedBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBlogs();
  }, []);

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
      {relatedBlogs.map((item, index) => (
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
