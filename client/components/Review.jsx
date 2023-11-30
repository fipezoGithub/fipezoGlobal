import styles from "@/styles/Review.module.css";
import { FaStar } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

function Review(props) {
  const { profilePicture } = props.review?.userDetails;
  const [title, setTitle] = useState(props.review.title);
  const [review, setReview] = useState(props.review.review);
  const [showEdit, setshowEdit] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [likeCount, setLikeCount] = useState(
    props.review.likeduser.length + props.review.likedcompany.length
  );
  const [replyText, setReplyText] = useState("");
  const [stars, setStars] = useState(props.review.stars);
  const [hover, setHover] = useState(null);
  const [reviewReply, setReviewReply] = useState(false);
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const loginType = localStorage.getItem("type")
    ? JSON.parse(localStorage.getItem("type"))
    : null;
  const [reviewError, setReviewError] = useState(false);
  const [minErr1, setMinErr1] = useState(false);
  const [minErr2, setMinErr2] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      props.review.likeduser.includes(props.user?._id) ||
      props.review.likedcompany.includes(props.company?._id)
    ) {
      setLikeDisabled(true);
    }
    if (props.review.reply) {
      setReplyText(props.review.reply);
    }
  }, []);

  function createParticle(x, y) {
    // Create a custom particle element
    const particle = document.createElement("particle");
    // Append the element into the body
    document.body.appendChild(particle);
    const size = Math.floor(Math.random() * 20 + 5);
    // Apply the size on each particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = "50%";
    particle.style.position = "fixed";
    particle.style.top = "0";
    particle.style.left = "0";
    particle.style.pointerEvents = "none";
    particle.style.opacity = "0";
    // Generate a random color in a blue/purple palette
    // particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    particle.style.background = `rgb(249, 6, 47)`;

    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    // Store the animation in a variable because we will need it later
    const animation = particle.animate(
      [
        {
          // Set the origin position of the particle
          // We offset the particle with half its size to center it around the mouse
          transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
          opacity: 1,
        },
        {
          // We define the final coordinates as the second keyframe
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        // Set a random duration from 500 to 1500ms
        duration: 500 + Math.random() * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        // Delay every particle with a random value from 0ms to 200ms
        delay: Math.random() * 200,
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }

  function pop(e) {
    // Loop to generate 30 particles at once
    for (let i = 0; i < 30; i++) {
      // We pass the mouse coordinates to the createParticle() function
      createParticle(e.clientX, e.clientY);
    }
  }

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
      if (res.ok) {
        setReviewReply(false);
        router.replace("/freelancer_profile");
      }
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

  const handelLike = async (e) => {
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/reviews/like/${props.review._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type: loginType }),
        }
      );
      const review = await res.json();
      if (res.ok) {
        setLikeDisabled(true);
        pop(e);
        setLikeCount(likeCount + 1);
      }
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
        <div className="flex items-center gap-2">
          <h4 className={`${styles.review_title} truncate`}>
            {props.review.title}
          </h4>
        </div>
        <p className={`${styles.review_text} break-words`}>
          {props.review.review}
        </p>
      </div>
      <div className="flex items-start">
        <span className="flex items-center gap-1 text-3xl">
          <div>
            {loginType ? (
              <button
                type="button"
                className="text-3xl text-red-600"
                title="Like"
                disabled={
                  loginType === "freelancer" || likeDisabled === true
                    ? true
                    : false
                }
                onClick={(e) => handelLike(e)}
              >
                {loginType === "freelancer" || likeDisabled === true ? (
                  <AiFillHeart className="pointer-events-none" />
                ) : (
                  <AiOutlineHeart className="pointer-events-none" />
                )}
              </button>
            ) : (
              <Link href="/login" className="text-[#c1c1c1] text-3xl">
                <AiFillHeart />
              </Link>
            )}
          </div>
          <span className={styles.oneFont + " text-lg"}>
            {likeCount ? likeCount : "0"}
          </span>
        </span>
      </div>
      {props.review.reply && (
        <div
          className={
            styles.review_details +
            " border-l border-black mt-2 flex justify-between items-start"
          }
        >
          <div>
            <h4 className="pl-2">
              Reply from{" "}
              {props.review.freelancer.firstname +
                " " +
                props.review.freelancer.lastname}
            </h4>
            <p className={`${styles.review_text} break-words pl-2`}>
              {props.review.reply}
            </p>
          </div>
          {props.user?._id === props.review.freelancer._id && (
            <button
              type="button"
              className="capitalize lg:text-sm"
              onClick={() => setReviewReply(true)}
            >
              edit
            </button>
          )}
        </div>
      )}
      {!props.review.reply &&
        props.user?._id === props.review.freelancer._id &&
        reviewReply === false && (
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
              type="button"
              onClick={() => setReviewReply(false)}
              className="capitalize p-1 text-red-500 hover:font-semibold"
            >
              cancel
            </button>
            <button
              type="submit"
              className="capitalize p-1 text-blue-500 hover:font-semibold"
            >
              submit
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
