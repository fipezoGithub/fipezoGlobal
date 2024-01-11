import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Create = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("featured");
  const [image, setImage] = useState("");
  const [metaDescriptions, setMetaDescriptions] = useState("");
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  let modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  let formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append(
        "uid",
        title.split(" ").join("_").split("?").join("_") +
          "_" +
          Math.ceil(Math.random() * 1000000000).toString(16)
      );
      data.append("title", title);
      data.append("content", content);
      data.append("category", category);
      data.append("cover", image);
      data.append("metaDescriptions", metaDescriptions);
      const res = await fetch(`${process.env.SERVER_URL}/blog/create`, {
        method: "POST",
        body: data,
      });
      const blog = await res.json();
      if (blog) {
        router.push(`/resources/details/${blog.uid}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProcedureContentChange = (text) => {
    setContent(text);
  };

  return (
    <>
      <Head>
        <title>Fipezo | Post a Blog</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex flex-col items-center justify-center gap-4">
        <h1 className="lg:text-3xl font-bold">Create Blog</h1>
        <form
          action=""
          onSubmit={addBlog}
          className="flex flex-col gap-4 items-center border shadow-md p-4 rounded-lg"
        >
          <div className="flex flex-col p-4 gap-4 w-full">
            <label htmlFor="title" className="capitalize text-xl">
              title
            </label>
            <input
              type="text"
              placeholder="Enter your title..."
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none focus:border-b p-3"
            />
          </div>
          <div className="flex flex-col p-4 gap-4 w-full mb-4">
            <label htmlFor="description" className="capitalize text-xl">
              description
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="write your content ...."
              onChange={handleProcedureContentChange}
              className="h-40"
            ></ReactQuill>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col p-4 gap-4">
              <label htmlFor="category" className="capitalize text-xl">
                category
              </label>
              <select
                name=""
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="capitalize font-bold focus:outline-none focus:border p-2"
              >
                <option value="featured" className="capitalize" selected>
                  featured
                </option>
                <option value="freelance_insights" className="capitalize">
                  freelance insights
                </option>
                <option value="hiring_insights" className="capitalize">
                  hiring insights
                </option>
                <option value="fipezo_insights" className="capitalize">
                  fipezo insights
                </option>
                <option value="how_to_guide" className="capitalize">
                  how to guide
                </option>
                <option value="success_stories" className="capitalize">
                  success stories
                </option>
              </select>
            </div>
            <div className="flex flex-col p-4 gap-4">
              <label htmlFor="cover" className="capitalize text-xl ">
                Cover Image
              </label>
              <input
                required
                type="file"
                accept="image/*"
                id="cover"
                className="p-2"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col p-4 gap-4">
              <label htmlFor="metaDescription" className="capitalize text-xl">
                Meta Decsription
              </label>
              <input
                type="text"
                placeholder="Enter Meta Description..."
                id="metaDescription"
                value={metaDescriptions}
                onChange={(e) => setMetaDescriptions(e.target.value)}
                className="focus:outline-none focus:border-b p-3"
              />
            </div>
          </div>
          <div className="flex flex-col p-4">
            <button
              type="submit"
              className="px-4 py-2 capitalize fomt-bold text-lg bg-blue-600 text-white rounded-lg"
            >
              submit
            </button>
          </div>
        </form>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Create;
