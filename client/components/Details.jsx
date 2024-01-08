import styles from "@/styles/Details.module.css";
import ProfileNav from "@/components/ProfileNav";
import Reviews from "@/components/Reviews";
import PortfolioCard from "@/components/PortfolioCard";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";

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
    if (props.premium === true) {
      setWorks(props.works);
    } else {
      setWorks(props.works.slice(0, 8));
    }
  }, [props.works]);

  return (
    <div className={styles.details}>
      {props?.profession !== undefined && (
        <ProfileNav
          handleReviews={handleReviews}
          showReviews={showReviews}
          showPortfolio={showPortfolio}
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
          {works.length <= 0 ? (
            <div className="flex items-center justify-center">
              <Image
                src="/no portfolio banner.png"
                width={400}
                height={400}
                alt="no portfolio found"
              />
            </div>
          ) : (
            <>
              {works.map((work, index) => {
                if (index > 5 && !showMore) return;
                return (
                  <>
                    {(props.profession === "photographer" ||
                      props.profession === "photo_editor" ||
                      props.profession === "model" ||
                      props.profession === "makeup_artist" ||
                      props.profession === "mehendi_artist" ||
                      props.profession === "album_designer" ||
                      props.profession === "web_developer" ||
                      props.profession === "graphics_designer" ||
                      props.profession === "mehendi_artist" ||
                      props.profession === "private_tutor" ||
                      props.profession === "drawing_teacher" ||
                      props.profession === "painter" ||
                      props.profession === "fashion_designer" ||
                      props.profession === "babysitter" ||
                      props.profession === "maid") && (
                      <PortfolioCard
                        key={index}
                        i={index}
                        work={work}
                        handleClick={props.handleClick}
                      />
                    )}
                    {(props?.profession === "cinematographer" ||
                      props?.profession === "video_editor" ||
                      props?.profession === "dance_teacher" ||
                      props?.profession === "music_teacher" ||
                      props?.profession === "lyricist" ||
                      props?.profession === "musician" ||
                      props?.profession === "voice_over_artist" ||
                      props?.profession === "vocalist") && (
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
                if (index > 5 && !showMore) return;
                if (work?.includes("https://yout")) {
                  return (
                    (props?.profession === "drone_operator" ||
                      props?.profession === "anchor" ||
                      props?.profession === "dj" ||
                      props?.profession === "dancer" ||
                      props?.profession === "influencer" ||
                      props?.profession === "actor" ||
                      props?.profession === "actress" ||
                      props?.profession === "interior_designer") && (
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
                } else if (work?.includes("works[]-")) {
                  return (
                    (props?.profession === "drone_operator" ||
                      props?.profession === "anchor" ||
                      props?.profession === "dj" ||
                      props?.profession === "dancer" ||
                      props?.profession === "influencer" ||
                      props?.profession === "actor" ||
                      props?.profession === "actress" ||
                      props?.profession === "interior_designer") && (
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
            </>
          )}
        </div>
      )}
      <div className={styles.cont}>
        {showPortfolio && works.length > 8 && !showMore && (
          <button className={styles.showMore} onClick={() => setShowMore(true)}>
            Show More...
          </button>
        )}
        {showPortfolio && works.length > 8 && showMore && (
          <button
            className={styles.showMore}
            onClick={() => setShowMore(false)}
          >
            Show Less
          </button>
        )}
      </div>
      {showReviews && (
        <Reviews
          reviews={props.reviews}
          user={props.user}
          company={props.company}
        />
      )}
    </div>
  );
}

export default Details;
