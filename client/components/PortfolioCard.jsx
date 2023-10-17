import styles from "../styles/PortfolioCard.module.css";
import Image from "next/image";

function PortfolioCard(props) {
  return (
    <div
      className={styles.portfolio_card + " cursor-pointer"}
      style={{
        backgroundImage: `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.work})`,
      }}
      onClick={() => props.handleClick(props.work, props.i)}
    >
      <Image
        src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.work}`}
        width={500}
        height={500}
        loading="eager"
        blurDataURL="/loadImg.gif"
        placeholder="blur"
        alt="work"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default PortfolioCard;
