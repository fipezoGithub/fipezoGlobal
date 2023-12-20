import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import DialogBox from "./DialogBox";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [dialogBox, setDialogBox] = useState(false);

  const subscribe = async () => {
    if (!email.includes("@") && !email.includes(".")) {
      return;
    }

    try {
      const res = await fetch(
        `https://connect.mailerlite.com/api/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization:
              `Bearer ${process.env.MAILERLITE_KEY}`,
          },
          body: JSON.stringify({
            email: email,
            groups: ["108077461123630952"],
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setDialogBox(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-[url('/psychedelic-paper-shapes-with-copy-space.jpg')] w-full bg-no-repeat bg-cover flex flex-col items-center md:items-start justify-center gap-4 h-[20rem] md:h-[30rem] md:px-12">
      <h1 className="text-[#2960a6] text-3xl md:text-6xl font-bold">
        Don&apos;t miss any chance
      </h1>
      <p className="text-[#2960a6] text-xl md:text-4xl font-medium tracking-wider">
        Subscribe our NewsLetter
      </p>
      <div className="border-b flex items-center justify-between px-4 py-1 my-6 w-80">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent placeholder:text-neutral-500 focus:outline-none placeholder:text-lg text-lg"
          placeholder="Enter your email"
        />
        <button type="button" className="" onClick={subscribe}>
          <FaArrowRight color="#2960a6" size="1.3rem" />
        </button>
      </div>
      {dialogBox === true && (
        <DialogBox
          title="You subscribed our Newsletter"
          text="You'll be notified latest feeds and updates through our email service."
          handleDialogBox={setDialogBox}
          home={false}
        />
      )}
    </main>
  );
};

export default Newsletter;
