import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
const FollowerFollowingModal = (props) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [isFollowingActive, setIsFollowingActive] = useState(
    props.showModalAs === "following" ? true : false
  );
  const router = useRouter();
  console.log(props);
  useEffect(() => {
    async function getFollowersList() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/freelancer/followers/${props.userId}`
        );
        const data = await res.json();
        setFollowers(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getFollowingList() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/freelancer/following/${props.userId}`
        );
        const data = await res.json();
        setFollowing(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowersList();
    getFollowingList();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur flex justify-center items-center z-30">
      <div className="bg-white rounded-md relative px-8 py-4 flex flex-col items-center gap-2 h-96 w-96">
        <button
          className="absolute top-1 right-1"
          onClick={() => props.setShowFollowingFollowerBox(false)}
        >
          <ImCross />
        </button>
        <ul className="flex gap-12 items-center">
          <li>
            <button
              className="capitalize text-xl py-2"
              style={
                isFollowingActive === false
                  ? { borderBottom: "1px solid black" }
                  : {}
              }
              onClick={() => setIsFollowingActive(false)}
            >
              followers
            </button>
          </li>
          <li>
            <button
              className="capitalize text-xl py-2"
              style={
                isFollowingActive === true
                  ? { borderBottom: "1px solid black" }
                  : {}
              }
              onClick={() => setIsFollowingActive(true)}
            >
              following
            </button>
          </li>
        </ul>

        <div className="flex flex-col items-center gap-4 w-full overflow-hidden overflow-y-scroll py-2 no-scrollbar">
          {isFollowingActive === true &&
            (following.length > 0 ? (
              following.map((item, index) => {
                if (props.user.following?.includes(item._id)) {
                  props.setIsFollowed(true);
                }
                return (
                  <div
                    key={index}
                    className="cursor-pointer flex items-center gap-2 justify-between w-full"
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.profilePicture}`}
                      width={50}
                      height={50}
                      alt="pro-pic-dp"
                      className="rounded-full object-cover h-12 w-12"
                    />
                    <p
                      className="capitalize font-medium text-lg"
                      onClick={() => {
                        router.push(`/profile/${item.uid}`);
                        props.setShowFollowingFollowerBox(false);
                      }}
                    >
                      {item.firstname} {item.lastname}
                    </p>
                    {props.user._id !== item._id && (
                      <button
                        type="button"
                        className="capitalize bg-[#0095f6] text-white p-2 text-sm rounded-xl"
                        onClick={() => props.handelFollow()}
                      >
                        {props.user.following?.includes(item._id)
                          ? "unfollow"
                          : "follow"}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-4">
                <img
                  src={"/no_followers_found.png"}
                  alt="no reviews img"
                  className="w-full"
                />
                <p className="text-center capitalize">no following available</p>
              </div>
            ))}
          {isFollowingActive === false &&
            (followers.length > 0 ? (
              followers.map((item, index) => {
                if (props.user.following?.includes(item._id)) {
                  props.setIsFollowed(true);
                }
                return (
                  <div
                    key={index}
                    className={`cursor-pointer flex items-center gap-2 ${
                      props.user._id !== item._id ? "justify-between" : " "
                    } w-full`}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.profilePicture}`}
                      width={50}
                      height={50}
                      alt="pro-pic-dp"
                      className="rounded-full object-cover h-12 w-12"
                    />
                    <p
                      className="capitalize font-medium text-lg"
                      onClick={() => {
                        router.push(`/profile/${item.uid}`);
                        props.setShowFollowingFollowerBox(false);
                      }}
                    >
                      {item.firstname} {item.lastname}
                    </p>
                    {props.user._id !== item._id && (
                      <button
                        type="button"
                        className="capitalize bg-[#0095f6] text-white p-2 text-sm rounded-xl"
                        onClick={() => props.handelFollow()}
                      >
                        {props.user.following?.includes(item._id)
                          ? "unfollow"
                          : "follow"}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-4">
                <img
                  src={"/no_followers_found.png"}
                  alt="no reviews img"
                  className="w-full"
                />
                <p className="text-center capitalize">no followers available</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowerFollowingModal;
