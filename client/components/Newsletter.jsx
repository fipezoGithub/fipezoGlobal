import React, { useState } from "react";
import { FaCloud } from "react-icons/fa";
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
            Authorization: `Bearer ${process.env.MAILERLITE_KEY}`,
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
    <main className="bg-[#293546] w-full bg-no-repeat bg-cover flex flex-col items-center justify-center gap-4 h-[20rem] md:h-[26rem] md:px-12">
      <h1 className="text-[#d9d2c8] text-xl md:text-3xl font-bold">
        Something cool is coming soon
      </h1>
      <p className="text-[#d9d2c8] text-3xl md:text-6xl font-medium tracking-wider italic text-center md:text-left">
        Intrested? Join our list.
      </p>
      <div className="border-2 rounded-3xl border-white flex items-center justify-between pl-4 my-6 gap-4">
        <button>
          <FaCloud color="#FFFFFF" size={"1.5em"} />
        </button>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent placeholder:text-[#d9d2c8] text-[#d9d2c8] focus:outline-none placeholder:text-sm md:placeholder:text-lg text-sm md:text-lg "
          placeholder="name@example.com"
        />
        <button
          type="button"
          className="uppercase bg-white rounded-r-3xl px-2 md:px-4 py-1 md:py-3 tracking-wider font-semibold md:text-2xl"
          onClick={subscribe}
        >
          submit
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
