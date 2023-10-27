import styles from "@/styles/Review.module.css";
import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { BsFillReplyAllFill } from "react-icons/bs";

function Review(props) {
  console.log(props);
  const { profilePicture } = props.review?.userDetails;
  const [title, setTitle] = useState(props.review.title);
  const [review, setReview] = useState(props.review.review);
  const [showEdit, setshowEdit] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [stars, setStars] = useState(props.review.stars);
  const [hover, setHover] = useState(null);
  const [reviewReply, setReviewReply] = useState(false);
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const [reviewError, setReviewError] = useState(false);
  const [minErr1, setMinErr1] = useState(false);
  const [minErr2, setMinErr2] = useState(false);

  const handelShowEdit = () => {
    setshowEdit(!showEdit);
  };

  const handelReply = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/review/reply/${props.review._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reply: replyText }),
        }
      );
      const data = await res.json();
      setReviewReply(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/edit/reviews/${props.review._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: title, review: review, stars: stars }),
        }
      );
      const data = await res.json();
      setshowEdit(false);
      props.review.stars = stars;
      props.review.title = title;
      props.review.review = review;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.review}>
      {props.review.user === props.user?._id && (
        <div className="relative peer group right-0">
          <button type="button" className="absolute top-0 right-0 p-2">
            <CiMenuKebab size={"1.5em"} />
          </button>
          <ul className="absolute top-0 right-6 p-2 hidden peer-hover:block group-hover:block">
            <li
              className="capitalize border border-solid px-2 py-1 cursor-pointer border-[#e2e8f0] rounded-[5px] shadow-[var(--shadow)]"
              onClick={handelShowEdit}
            >
              edit
            </li>
          </ul>
        </div>
      )}
      <div className={styles.user_info}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url(${
              profilePicture === undefined || profilePicture === null
                ? "/dp.png"
                : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`
            })`,
          }}
        ></div>
        <div className={styles.user_details}>
          <h3 className={styles.user_name + " capitalize"}>
            {props.review.userDetails.firstname}{" "}
            {props.review.userDetails.lastname}
          </h3>
        </div>
      </div>
      <div className={styles.stars}>
        {[...Array(5)].map((star, index) => (
          <FaStar
            size={16}
            key={index}
            color={index + 1 <= props.review.stars ? "#fbbc04" : "white"}
          />
        ))}
      </div>
      <div className={styles.review_details}>
        <h4 className={`${styles.review_title} break-words`}>
          {props.review.title}
        </h4>
        <p className={`${styles.review_text} break-words`}>
          {props.review.review}
        </p>
      </div>
      {props.review.reply && (
        <div className={styles.review_details + " border-l border-black mt-2"}>
          <h4 className="pl-2">Response from freelancer</h4>
          <p className={`${styles.review_text} break-words pl-2`}>
            {props.review.reply}
          </p>
        </div>
      )}
      {props.user?._id === props.review.freelancer && reviewReply === false && (
        <div className="my-2">
          <button
            type="button"
            onClick={() => setReviewReply(true)}
            className="text-sm capitalize flex items-center text-blue-600 gap-1"
          >
            <BsFillReplyAllFill />
            reply
          </button>
        </div>
      )}
      {reviewReply === true && (
        <form
          className="flex items-center flex-col w-full"
          onSubmit={handelReply}
        >
          <div className="w-full border-b">
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              placeholder="add reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="p-2 outline-none placeholder:capitalize resize-none w-full"
            ></textarea>
          </div>
          <div className="flex items-center gap-1 self-end">
            <button
              type="submit"
              className="capitalize p-1 text-blue-500 hover:font-semibold"
            >
              submit
            </button>
            <button
              type="button"
              onClick={() => setReviewReply(false)}
              className="capitalize p-1 text-red-500 hover:font-semibold"
            >
              cancel
            </button>
          </div>
        </form>
      )}
      {showEdit === true && (
        <div className={styles.reviewBox}>
          <span onClick={() => setshowEdit(false)} className={styles.cross}>
            <ImCross />
          </span>
          {minErr1 && (
            <p className={styles.error}>
              <span>Title must be atleast 5 characters long</span>
            </p>
          )}
          {minErr2 && (
            <p className={styles.error}>
              <span>Review must be atleast 25 characters long</span>
            </p>
          )}
          <div className={styles.stars}>
            {[...Array(5)].map((star, index) => (
              <label key={index}>
                <input
                  className={styles.inputStars}
                  type="radio"
                  name="rating"
                  value={index + 1}
                  onClick={(e) => setStars(e.target.value)}
                />
                <FaStar
                  size={25}
                  key={index}
                  onMouseEnter={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(null)}
                  className={styles.star}
                  color={index + 1 <= (hover || stars) ? "#fbbc04" : "#d0d0d0"}
                  onChange={(e) => {
                    setReviewError(false);
                    setStars(e.target.value);
                  }}
                />
              </label>
            ))}
          </div>
          <label htmlFor="title" className={styles.label}>
            <span className="text-red-500">* </span>Overview
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setReviewError(false);
              setMinErr1(false);
              setMinErr2(false);
              setTitle(e.target.value);
            }}
            maxLength={60}
          />
          <label htmlFor="review" className={styles.label}>
            <span className="text-red-500">* </span>Describe in Details
          </label>
          <textarea
            className={styles.textarea}
            name="review"
            id="review"
            cols="30"
            rows="10"
            value={review}
            onChange={(e) => {
              setReviewError(false);
              setMinErr1(false);
              setMinErr2(false);
              setReview(e.target.value);
            }}
            maxLength={500}
          ></textarea>
          <button className={styles.btn} onClick={handelUpdate}>
            update
          </button>
        </div>
      )}
    </div>
  );
}

export default Review;
