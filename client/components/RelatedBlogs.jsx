import Image from "next/image";
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
      <h3 className="text-xl lg:text-3xl font-semibold">Related Posts</h3>
      {relatedBlogs.slice(0, 4).map((item, index) => (
        <Link
          href={`/resources/details/${item.uid}`}
          onClick={() => viewCount(item._id)}
          key={index}
          className="my-4 hover:text-blue-600 flex flex-col gap-4"
        >
          <div className="overflow-hidden">
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
              width={400}
              height={400}
              alt={item.title}
              className="transition-transform hover:scale-110 duration-500"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-xl font-medium line-clamp-2">{item.title}</p>
            <p className="text-neutral-500 text-sm font-semibold">
              {new Date(item.createdAt).toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedBlogs;
