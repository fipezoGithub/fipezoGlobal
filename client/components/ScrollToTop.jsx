import React, { useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
const ScrollToTop = () => {
  const scrollRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let screenHeight = currentScrollPercentage();
      if (screenHeight >= 30) {
        scrollRef.current.style.transform = "translateX(0%)";
      } else {
        if (scrollRef.current.hasAttribute("style")) {
          scrollRef.current.removeAttribute("style");
        }
      }
    });
    function currentScrollPercentage() {
      return Math.round(
        (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
          100
      );
    }
  }, []);

  const handelScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-1/4 right-0 z-[1100] transition-transform translate-x-full duration-500"
      ref={(e) => (scrollRef.current = e)}
    >
      <button
        type="button"
        onClick={handelScrollTop}
        className={"text-3xl p-2 bg-black text-white rounded-l bg-opacity-50"}
      >
        <IoIosArrowUp />
      </button>
    </div>
  );
};

export default ScrollToTop;
