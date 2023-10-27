import Image from "next/image";
import styles from "../styles/Reviews.module.css";
import Review from "@/components/Review";

function Reviews(props) {
  return (
    <div className={styles.reviews}>
      {props.reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-2 justify-center h-full">
          <Image
            src={"/no_review.png"}
            width={400}
            height={800}
            alt="no reviews img"
            className="w-full"
          />
          <h1 className="text-center capitalize text-2xl">no reviews found</h1>
        </div>
      ) : (
        props.reviews
          .slice(0)
          .reverse()
          .map((review) => (
            <Review key={review._id} review={review} user={props.user} />
          ))
      )}
    </div>
  );
}

export default Reviews;
