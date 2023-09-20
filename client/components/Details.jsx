import styles from "@/styles/Details.module.css";
import ProfileNav from "@/components/ProfileNav";
import Reviews from "@/components/Reviews";
import PortfolioCard from "@/components/PortfolioCard";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function Details(props) {
  const [showReviews, setShowReviews] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [works, setWorks] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const handleReviews = () => {
    setShowReviews(true);
    setShowPortfolio(false);
  };
  const handlePortfolio = () => {
    setShowReviews(false);
    setShowPortfolio(true);
  };

  useEffect(() => {
    setWorks(props.works);
  }, [props.works]);
  return (
    <div className={styles.details}>
      {props?.profession !== undefined && (
        <ProfileNav
          handleReviews={handleReviews}
          handlePortfolio={handlePortfolio}
        />
      )}
      {props?.profession === undefined && (
        <nav className={styles.profile_nav}>
          <h1
            className={styles.nav}
            id={styles.portfolio}
            onClick={props.handlePortfolio}
          >
            Portfolio
          </h1>
        </nav>
      )}
      {showPortfolio && (
        <div className={styles.portfolio}>
          {works.map((work, index) => {
            if (index > 5 && !showMore) return;
            return (
              <>
                {(props.profession === "photographer" ||
                  props.profession === "photo_editor" ||
                  props.profession === "model" ||
                  props.profession === "makeup_artist" ||
                  props.profession === "album_designer" ||
                  props.profession === "web_developer" ||
                  props.profession === "graphics_designer") && (
                  <PortfolioCard
                    key={index}
                    i={index}
                    work={work}
                    handleClick={props.handleClick}
                  />
                )}
                {(props?.profession === "cinematographer" ||
                  props?.profession === "video_editor") && (
                  <div className="mb-4" key={index}>
                    <ReactPlayer
                      controls={true}
                      width="280px"
                      height="250px"
                      url={work}
                    />
                  </div>
                )}
                {props?.profession === undefined && (
                  <PortfolioCard
                    key={index}
                    i={index}
                    work={work}
                    handleClick={props.handleClick}
                  />
                )}
              </>
            );
          })}
          {works.map((work, index) => {
            if (index >= 0 && index < 4) {
              return (
                (props?.profession === "drone_operator" ||
                  props?.profession === "anchor" ||
                  props?.profession === "dj" ||
                  props?.profession === "dancer" ||
                  props?.profession === "influencer") && (
                  <div className="mb-4" key={index}>
                    <ReactPlayer
                      controls={true}
                      width="280px"
                      height="250px"
                      url={work}
                    />
                  </div>
                )
              );
            } else if (index >= 4 && index < 6) {
              return (
                (props?.profession === "drone_operator" ||
                  props?.profession === "anchor" ||
                  props?.profession === "dj" ||
                  props?.profession === "dancer" ||
                  props?.profession === "influencer") && (
                  <PortfolioCard
                    key={index}
                    i={index}
                    work={work}
                    handleClick={props.handleClick}
                  />
                )
              );
            } else if (index >= 6 && index < 8 && showMore) {
              return (
                (props?.profession === "drone_operator" ||
                  props?.profession === "anchor" ||
                  props?.profession === "dj" ||
                  props?.profession === "dancer" ||
                  props?.profession === "influencer") && (
                  <PortfolioCard
                    key={index}
                    i={index}
                    work={work}
                    handleClick={props.handleClick}
                  />
                )
              );
            } else {
              return;
            }
          })}
        </div>
      )}
      {/* <div className={styles.cont}>
        {showPortfolio && works.length > 5 && !showMore && (
          <button className={styles.showMore} onClick={() => setShowMore(true)}>
            Show More...
          </button>
        )}
        {showPortfolio && works.length > 5 && showMore && (
          <button
            className={styles.showMore}
            onClick={() => setShowMore(false)}
          >
            Show Less
          </button>
        )}
      </div> */}
      {showReviews && <Reviews reviews={props.reviews} user={props.user} />}
    </div>
  );
}

export default Details;
