import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const Modal = ({
  clickedImg,
  setClickedImg,
  handelRotationRight,
  handelRotationLeft,
}) => {
  const handleClick = (e) => {
    setClickedImg(null);
  };
  return (
    <>
      <div className="overlay dismiss backdrop-blur z-[2000]">
        <div
          className="image h-full overflow-hidden"
          style={{ backgroundImage: `url('${clickedImg}')` }}
        >
          <Image
            src={`${clickedImg}`}
            layout="fill"
            objectFit="contain"
            alt="portfolio-img"
            className="w-auto h-full shadow-[3px_5px_7px_rgba(0,_0,_0,_0.5)] object-contain"
          />
        </div>
        <button
          className="dismiss"
          type="button"
          onClick={(e) => handleClick(e)}
        >
          <AiOutlineCloseCircle className="text-white" />
        </button>
        <div
          onClick={handelRotationLeft}
          className="overlay-arrows_left cursor-pointer"
        >
          <div>
            <BsArrowLeftCircle />
          </div>
        </div>
        <div
          onClick={handelRotationRight}
          className="overlay-arrows_right cursor-pointer"
        >
          <div>
            <BsArrowRightCircle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
