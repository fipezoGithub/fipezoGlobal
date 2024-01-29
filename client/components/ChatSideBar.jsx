import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ChatSideBar = (props) => {
  const [chatRooms, setChatRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getChatRooms() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/allchatrooms/${props.user.userDetails?._id}?type=${props.user.userType}`
        );
        const respData = await res.json();
        console.log(respData);
        setChatRooms(respData);
      } catch (error) {
        console.log(error);
      }
    }
    getChatRooms();
  }, [props.user]);

  return (
    <div
      className='flex flex-col md:items-center md:justify-center gap-4 min-w-fit px-4 py-2 absolute md:static bg-white h-full md:h-auto w-full md:w-auto translate-x-full md:translate-x-0 transition-transform duration-300'
      style={props.style}
    >
      <h1 className='text-2xl font-semibold'>Recent Chats</h1>
      <div className='flex flex-col gap-2'>
        {props.user.userType === "freelancer" &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => {
            if (chat.company) {
              return (
                <Link
                  key={i}
                  className={
                    "flex items-center gap-2 border-b pb-2 " +
                    (router.asPath ===
                      `/chats/${props.user.userDetails.uid}+${chat.company?.uid}/${chat.messageId}` &&
                      "bg-neutral-300 p-2")
                  }
                  href={`/chats/${props.user.userDetails.uid}+${chat.company?.uid}/${chat.messageId}`}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${chat.company?.profilePicture}`}
                    width={300}
                    height={300}
                    alt='Company profile'
                    className='w-12 h-12 rounded-full'
                  />
                  <h1 className='text-lg font-semibold'>
                    {chat.company.companyname}
                  </h1>
                </Link>
              );
            } else {
              return (
                <Link
                  key={i}
                  className={
                    "flex items-center gap-2 border-b pb-2 " +
                    (router.asPath ===
                      `/chats/${props.user.userDetails.uid}+${chat.company?.uid}/${chat.messageId}` &&
                      "bg-neutral-300 p-2")
                  }
                  href={`/chats/${props.user.userDetails.uid}+${chat.company?.uid}/${chat.messageId}`}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${chat.user.profilePicture}`}
                    width={150}
                    height={150}
                    alt='user profile'
                    className='w-12 h-12 rounded-full'
                  />
                  <h1 className='text-lg font-semibold'>
                    {chat.user?.firstname} {chat.user?.lastname}
                  </h1>
                </Link>
              );
            }
          })}
        {props.user.userType === "user" &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => (
            <div
              key={i}
              className={
                "flex items-center gap-2 border-b pb-2 " +
                (router.asPath ===
                  `/chats/${props.user.userDetails.uid}+${chat.user?.uid}/${chat.messageId}` &&
                  "bg-neutral-300 p-2")
              }
            >
              <Image
                src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${chat.freelancer?.profilePicture}`}
                width={150}
                height={150}
                alt='freelancer profile'
                className='w-12 h-12 rounded-full'
              />
              <h1 className='text-lg font-semibold'>
                {chat.freelancer?.firstname} {chat.freelancer?.lastname}
              </h1>
            </div>
          ))}
        {props.user.userType === "company" &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => (
            <Link
              key={i}
              className={
                "flex items-center gap-2 border-b pb-2 " +
                (router.asPath ===
                  `/chats/${props.user.userDetails.uid}+${chat.freelancer.uid}/${chat.messageId}` &&
                  "bg-neutral-300 p-2")
              }
              href={`/chats/${props.user.userDetails.uid}+${chat.freelancer.uid}/${chat.messageId}`}
            >
              <Image
                src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${chat.freelancer.profilePicture}`}
                width={150}
                height={150}
                alt='freelancer profile'
                className='w-12 h-12 rounded-full'
              />
              <h1 className='text-lg font-semibold'>
                {chat.freelancer.firstname} {chat.freelancer.lastname}
              </h1>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
