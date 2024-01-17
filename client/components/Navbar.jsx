import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaBell } from "react-icons/fa";

export default function Navbar(props) {
  const [background, setBackground] = useState("transparent");
  const [border, setBorder] = useState("0px");
  const [color, setColor] = useState(props.color);
  const [isAdmin, setIsAdmin] = useState(false);
  const [city, setCity] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [display2, setDisplay2] = useState("none");
  const [display3, setDisplay3] = useState("none");
  const [display4, setDisplay4] = useState("none");
  const [display5, setDisplay5] = useState("none");
  const [premium, setPremium] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const sideNavRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const city = localStorage.getItem("city")
      ? localStorage.getItem("city")
      : null;
    setCity(city);
    if (token && !props.user && !props.company) {
      fetch(`${process.env.SERVER_URL}/navbar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          getNotifications(data.user);
          if (data.user.premium === true) {
            setPremium(true);
          }
          if (data.user.phone === 3335573725 && !data.user.location)
            setIsAdmin(true);
          if (data.user.companyname) props.setCompany(data.user);
          else props.setUser(data.user);
          if (props.checkLoggedIn) props.checkLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (props.user && token) {
      if (props.user.phone && props.user.phone === 3335573725) setIsAdmin(true);
      getNotifications(props.user);
      if (props.user.premium === true) {
        setPremium(true);
      }
      if (props.checkLoggedIn) props.checkLoggedIn(true);
    } else if (props.company && token) {
      if (props.checkLoggedIn) props.checkLoggedIn(true);
      getNotifications(props.company);
    } else {
      if (props.checkLoggedIn) props.checkLoggedIn(false);
    }

    if (user.premium === true) {
      setPremium(true);
    }
    async function getNotifications(loggedUser) {
      let res;
      if (loggedUser.companyname) {
        res = await fetch(
          `${process.env.SERVER_URL}/notification/${loggedUser._id}?type=company`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else if (!loggedUser.companyname && loggedUser.uid) {
        res = await fetch(
          `${process.env.SERVER_URL}/notification/${loggedUser._id}?type=freelancer`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        res = await fetch(
          `${process.env.SERVER_URL}/notification/${loggedUser._id}?type=user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      const noti = await res.json();
      const filtered = noti.filter((not) => {
        return not.seen === false;
      });
      setNotificationCount(filtered.length);
    }
  }, [props.user, props.company, city, user]);

  const handleLogout = () => {
    router.replace("/");
    localStorage.removeItem("user");
    localStorage.removeItem("type");
    setIsAdmin(false);
    if (props.user) props.setUser(null);
    if (props.company) props.setCompany(null);
    if (props.checkLoggedIn) props.checkLoggedIn(false);
  };

  const handelSideNav = () => {
    sideNavRef.current.style.display = "flex";
    sideNavRef.current.style.transform = "translateX(0%)";
  };

  const closeSideNav = () => {
    sideNavRef.current.removeAttribute("style");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setColor("#000");
        setBorder("1px solid lightgray");
        setBackground("#fff");
      } else {
        setColor(props.color);
        setBorder("0px");
        setBackground("transparent");
      }
    });
  }, [props.color]);

  return (
    <nav
      className={styles.navbar}
      style={{
        color: color,
        backgroundColor: background,
        borderBottom: border,
      }}
    >
      <div className={styles.left}>
        <Link href="/">
          <i className={styles.fipezo}>Fipezo</i>
          {router.asPath === "/careers" && (
            <i className="uppercase font-bold not-italic text-xl ml-2 text-neutral-600">
              careers
            </i>
          )}
        </Link>
      </div>
      <div className="lg:hidden flex gap-2">
        {(props.user || props.company) && (
          <Link
            href="/my_notifications"
            className={"flex items-center justify-center gap-2 relative"}
          >
            <FaBell size={"1.6em"} />{" "}
            {notificationCount > 0 && (
              <span className="absolute right-0 top-0 bg-red-500 font-bold rounded-full w-4 h-4 text-center text-sm">
                {notificationCount}
              </span>
            )}
          </Link>
        )}
        <button type="button" onClick={handelSideNav}>
          <RiMenu3Fill size={"2em"} />
        </button>
      </div>
      <div className={styles.right + " hidden lg:block"}>
        <div className={styles.left + " lg:hidden"}>
          <Link href="/">
            <i className={styles.fipezo}>Fipezo</i>
          </Link>
        </div>
        <ul className={styles.navigations}>
          <li className={styles.navElement}>
            <Link href="/">
              <span id={styles.home}>Home&nbsp;&nbsp;</span>
            </Link>
          </li>

          {/* <li className={styles.navElement}>
            <Link href={city === null ? `/jobs` : `/jobs/${city}`}>
              <span id={styles.home}>Browse&nbsp;Jobs&nbsp;&nbsp;</span>
            </Link>
          </li> */}
          <li className={styles.navElement}>
            <Link href="/jobs">
              <span id={styles.home}>Browse&nbsp;Jobs&nbsp;&nbsp;</span>
            </Link>
          </li>

          {/* {logInType === "freelancer" && (
            <li className={styles.navElement}>
              <Link href={"/feed/"}>
                <span id={styles.home}>Feed&nbsp;&nbsp;</span>
              </Link>
            </li>
          )} */}
          <li
            className={styles.navElement}
            onClick={() => {
              if (display5 === "none") setDisplay5("flex");
              else setDisplay5("none");
            }}
            onMouseEnter={() => setDisplay5("flex")}
            onMouseLeave={() => setDisplay5("none")}
          >
            <span>Explore&nbsp;&nbsp;</span>
            <BiChevronDown
              className={styles.icon}
              style={{ fontSize: 15, color: color }}
            />
            <div
              className={styles.dropDown}
              id={styles.box}
              style={{ display: display5 }}
            >
              <Link className={styles.optionBox} href="/explore/freelancers">
                <h1 className={styles.mainText}>Freelancers</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Find Different Type of Freelancers
                </p>
              </Link>
              <Link className={styles.optionBox} href="/explore/companies">
                <h1 className={styles.mainText}>Companies</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Find Different Type of Companies
                </p>
              </Link>
            </div>
          </li>

          <li className={styles.navElement}>
            <Link href="/resources">
              <span id={styles.home}>Resources&nbsp;&nbsp;</span>
            </Link>
          </li>

          {/* <li
            className={styles.navElement}
            onClick={() => {
              if (display === "none") setDisplay("flex");
              else setDisplay("none");
            }}
            onMouseEnter={() => setDisplay("flex")}
            onMouseLeave={() => setDisplay("none")}
          >
            <span>Register&nbsp;&nbsp;</span>
            <BiChevronDown
              className={styles.icon}
              style={{ fontSize: 15, color: color }}
            />
            <div
              className={styles.dropDown}
              id={styles.box}
              style={{ display: display }}
            >
              <Link className={styles.optionBox} href="/register/freelancer">
                <h1 className={styles.mainText}>As a Freelancer</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Empowering Your Career: Registering as a Freelancer
                </p>
              </Link>
              <Link className={styles.optionBox} href="/register/company">
                <h1 className={styles.mainText}>As a Company</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Building Success: Registering Your Company
                </p>
              </Link>
            </div>
          </li> */}

          <li
            className={styles.navElement}
            onClick={() => {
              if (display2 === "none") setDisplay2("flex");
              else setDisplay2("none");
            }}
            onMouseEnter={() => setDisplay2("flex")}
            onMouseLeave={() => setDisplay2("none")}
          >
            <span>Help&nbsp;&nbsp;</span>
            <BiChevronDown
              className={styles.icon}
              style={{ fontSize: 15, color: color }}
            />
            <div
              className={styles.dropDown}
              id={styles.box}
              style={{ display: display2 }}
            >
              <Link className={styles.optionBox} href="/contact_us">
                <h1 className={styles.mainText}>Contact Us</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Reach out to use for an query or help
                </p>
              </Link>
              <Link className={styles.optionBox} href="/faqs">
                <h1 className={styles.mainText}>FAQs</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Check out some asked questions
                </p>
              </Link>
            </div>
          </li>

          {isAdmin && (
            <li className={styles.navElement}>
              <Link href="/admin/dashboard" className={styles.navElement}>
                Admin&nbsp;Panel
              </Link>
            </li>
          )}

          {!props.user && !props.company && (
            <li className={styles.navElement}>
              <Link href="/login">Log&nbsp;In</Link>
            </li>
          )}

          {!props.user && !props.company && (
            <li className="p-2">
              <Link
                href="/signup"
                className="bg-blue-600 md:text-sm text-white px-5 py-3 font-bold rounded-[7px] hover:bg-blue-800 shadow-md whitespace-nowrap"
              >
                Get started - It&apos;s free
              </Link>
            </li>
          )}

          {props.user && (
            <li
              className={`${styles.navElement} ${styles.user}`}
              id={styles.user}
              onClick={() => {
                if (display3 === "none") setDisplay3("flex");
                else setDisplay3("none");
              }}
              onMouseEnter={() => setDisplay3("flex")}
              onMouseLeave={() => setDisplay3("none")}
            >
              <span className="truncate w-5/6 capitalize">
                {props.user && !props.company ? `${props.user.firstname}` : ""}
                &nbsp;&nbsp;
              </span>
              <BiChevronDown style={{ fontSize: 16, color: color }} />
              <div
                className={styles.profile_card}
                style={{ display: display3 }}
              >
                <div
                  className={styles.dp + " overflow-hidden"}
                  style={{
                    backgroundImage: `url('${
                      props.user.profilePicture
                        ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.profilePicture}'`
                        : "/dp.png"
                    })`,
                  }}
                >
                  <Image
                    src={
                      props.user.profilePicture
                        ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.profilePicture}`
                        : "/dp.png"
                    }
                    width={500}
                    height={500}
                    alt="user dp"
                    blurDataURL="/loadImg.gif"
                    placeholder="blur"
                    className="h-full w-full"
                  />
                </div>
                <h1 className={styles.name + " capitalize"}>
                  {props.user
                    ? `${props.user.firstname} ${props.user.lastname}`
                    : ""}
                </h1>
                <p className={styles.number}>
                  {props.user ? props.user.phone : ""}
                </p>
                {props.user.uid &&
                  (props.user.works.length > 0 ? (
                    <Link className={styles.btn} href={`/freelancer_profile`}>
                      My Profile
                    </Link>
                  ) : (
                    <Link
                      className={styles.btn}
                      href={`/complete-your-profile`}
                    >
                      Complete your profile
                    </Link>
                  ))}
                {props.user.uid && (
                  <Link
                    className={styles.btn}
                    href={
                      premium === true
                        ? "/subscriptionstatus"
                        : "/freelancer-premium-plans"
                    }
                  >
                    Premium{" "}
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-md uppercase">
                      offer
                    </span>
                  </Link>
                )}
                {!props.user.uid && (
                  <Link className={styles.btn} href="/user_profile">
                    My Profile
                  </Link>
                )}
                <Link
                  href="/my_notifications"
                  className={
                    styles.btn + " flex items-center justify-center gap-2"
                  }
                >
                  Notifications <FaBell size={"1.2em"} />{" "}
                  {notificationCount > 0 && (
                    <span className=" bg-red-500 font-bold rounded-full w-6 h-6 text-center text-white">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                {props.user.uid && (
                  <Link className={styles.btn} href={`/profile-setting`}>
                    Dashboard
                  </Link>
                )}
                {router.pathname !== "/admin/dashboard" && (
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                )}
              </div>
            </li>
          )}

          {props.company && (
            <li
              className={`${styles.navElement} ${styles.user}`}
              id={styles.user}
              onClick={() => {
                if (display4 === "none") setDisplay4("flex");
                else setDisplay4("none");
              }}
              onMouseEnter={() => setDisplay4("flex")}
              onMouseLeave={() => setDisplay4("none")}
            >
              <span>
                {props.company && !props.user
                  ? `${props.company.companyname}`
                  : ""}
                &nbsp;&nbsp;
              </span>
              <BiChevronDown style={{ fontSize: 16, color: color }} />
              <div
                className={styles.profile_card}
                style={{ display: display4 }}
              >
                <div
                  className={styles.dp + " overflow-hidden"}
                  style={{
                    backgroundImage: `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.company.profilePicture})`,
                  }}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.company.profilePicture}`}
                    width={500}
                    height={500}
                    alt="user dp"
                    blurDataURL="/loadImg.gif"
                    placeholder="blur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className={styles.name}>
                  {props.company ? `${props.company.companyname} ` : ""}
                </h1>
                <p className={styles.number}>
                  {props.company ? props.company.companyphone : ""}
                </p>
                <Link
                  className={styles.btn}
                  href={`/company/${props.company.uid}`}
                >
                  My Profile
                </Link>
                <Link
                  href="/my_notifications"
                  className={
                    styles.btn + " flex items-center justify-center gap-2"
                  }
                >
                  Notifications <FaBell size={"1.2em"} />{" "}
                  {notificationCount > 0 && (
                    <span className="bg-red-500 font-bold rounded-full w-6 h-6 text-center text-white">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <Link className={styles.btn} href="/profile-setting">
                  Dashboard
                </Link>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div
        className={styles.right + " px-2 py-1 text-white lg:hidden"}
        ref={sideNavRef}
      >
        <div className="lg:hidden absolute top-[1%] right-[2%] z-[1100]">
          <button type="button" onClick={closeSideNav}>
            <RxCross2 color="white" size={"2rem"} />
          </button>
        </div>
        <div className={styles.left + " lg:hidden"}>
          <Link href="/">
            <i className={styles.fipezo}>Fipezo</i>
          </Link>
        </div>
        <ul className={styles.navigations}>
          <li className={styles.navElement}>
            <Link href="/">
              <span id={styles.home}>Home&nbsp;&nbsp;</span>
            </Link>
          </li>
          <li className={styles.navElement}>
            <Link href="/jobs">
              <span id={styles.home}>Browse Jobs&nbsp;&nbsp;</span>
            </Link>
          </li>
          <li
            className={styles.navElement}
            onClick={() => {
              if (display5 === "none") setDisplay5("flex");
              else setDisplay5("none");
            }}
            onMouseEnter={() => setDisplay5("flex")}
            onMouseLeave={() => setDisplay5("none")}
          >
            <span>Explore&nbsp;&nbsp;</span>
            <BiChevronDown
              className={styles.icon}
              style={{ fontSize: 15, color: "white" }}
            />
            <div
              className={styles.dropDown}
              id={styles.box}
              style={{ display: display5 }}
            >
              <Link className={styles.optionBox} href="/explore/freelancers">
                <h1 className={styles.mainText}>Freelancers</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Find Different Type of Freelancers
                </p>
              </Link>
              <Link className={styles.optionBox} href="/explore/companies">
                <h1 className={styles.mainText}>Companies</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Find Different Type of Companies
                </p>
              </Link>
            </div>
          </li>

          <li className={styles.navElement}>
            <Link href="/resources">
              <span id={styles.home}>Resources&nbsp;&nbsp;</span>
            </Link>
          </li>

          <li
            className={styles.navElement}
            onClick={() => {
              if (display2 === "none") setDisplay2("flex");
              else setDisplay2("none");
            }}
            onMouseEnter={() => setDisplay2("flex")}
            onMouseLeave={() => setDisplay2("none")}
          >
            <span>Help&nbsp;&nbsp;</span>
            <BiChevronDown
              className={styles.icon}
              style={{ fontSize: 15, color: "white" }}
            />
            <div
              className={styles.dropDown}
              id={styles.box}
              style={{ display: display2 }}
            >
              <Link className={styles.optionBox} href="/contact_us">
                <h1 className={styles.mainText}>Contact Us</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Reach out to use for an query or help
                </p>
              </Link>
              <Link className={styles.optionBox} href="/faqs">
                <h1 className={styles.mainText}>FAQs</h1>
                <p className={styles.subText + " text-orange-500"}>
                  Check out some asked questions
                </p>
              </Link>
            </div>
          </li>

          {isAdmin && (
            <li className={styles.navElement}>
              <Link href="/admin/dashboard" className={styles.home}>
                Admin Panel
              </Link>
            </li>
          )}

          {!props.user && !props.company && (
            <li className={styles.navElement} id={styles.noUnderline}>
              <Link href="/login" className={styles.login}>
                Login
              </Link>
            </li>
          )}

          {!props.user && !props.company && (
            <li className="p-2">
              <Link
                href="/signup"
                className="bg-white text-black px-5 py-3 font-bold rounded-[7px] hover:bg-blue-800 shadow-md whitespace-nowrap"
              >
                Get started - It&apos;s free
              </Link>
            </li>
          )}

          {props.user && (
            <li
              className={`${styles.navElement} ${styles.user}`}
              id={styles.user}
              onClick={() => {
                if (display3 === "none") setDisplay3("flex");
                else setDisplay3("none");
              }}
              onMouseEnter={() => setDisplay3("flex")}
              onMouseLeave={() => setDisplay3("none")}
            >
              <span className="truncate lg:w-5/6 w-auto capitalize">
                {props.user && !props.company
                  ? `${props.user.firstname + " " + props.user.lastname}`
                  : ""}
                &nbsp;&nbsp;
              </span>
              <BiChevronDown style={{ fontSize: 16, color: "white" }} />
              <div
                className={styles.profile_card}
                style={{ display: display3 }}
              >
                <div
                  className={styles.dp + " overflow-hidden"}
                  style={{
                    backgroundImage: `url(${
                      props.user.profilePicture
                        ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.profilePicture}`
                        : "/dp.png"
                    })`,
                  }}
                >
                  <Image
                    src={
                      props.user.profilePicture
                        ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.profilePicture}`
                        : "/dp.png"
                    }
                    width={500}
                    height={500}
                    blurDataURL="/loadImg.gif"
                    placeholder="blur"
                    alt="user dp"
                    className="h-full w-full"
                  />
                </div>
                <h1 className={styles.name + " capitalize"}>
                  {props.user
                    ? `${props.user.firstname} ${props.user.lastname}`
                    : ""}
                </h1>
                <p className={styles.number}>
                  {props.user ? props.user.phone : ""}
                </p>
                {props.user.uid &&
                  (props.user.works.length > 0 ? (
                    <Link className={styles.btn} href={`/freelancer_profile`}>
                      My Profile
                    </Link>
                  ) : (
                    <Link
                      className={styles.btn}
                      href={`/complete-your-profile`}
                    >
                      Complete Your Profile
                    </Link>
                  ))}
                {props.user.uid &&
                  (premium === true ? (
                    <Link className={styles.btn} href={"/subscriptionstatus"}>
                      Premium{" "}
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-md uppercase text-sm">
                        offer
                      </span>
                    </Link>
                  ) : (
                    <Link
                      className={styles.btn}
                      href={"/freelancer-premium-plans"}
                    >
                      Premium{" "}
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-md uppercase text-sm">
                        offer
                      </span>
                    </Link>
                  ))}
                {!props.user.uid && (
                  <Link className={styles.btn} href="/user_profile">
                    My Profile
                  </Link>
                )}
                {props.user.uid && (
                  <Link className={styles.btn} href={`/profile-setting`}>
                    Dashboard
                  </Link>
                )}
                {router.pathname !== "/admin/dashboard" && (
                  <button
                    className={styles.btn}
                    type="button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                )}
              </div>
            </li>
          )}

          {props.company && (
            <li
              className={`${styles.navElement} ${styles.user}`}
              id={styles.user}
              onClick={() => {
                if (display4 === "none") setDisplay4("flex");
                else setDisplay4("none");
              }}
              onMouseEnter={() => setDisplay4("flex")}
              onMouseLeave={() => setDisplay4("none")}
            >
              <span className="truncate">
                {props.company && !props.user
                  ? `${props.company.companyname}`
                  : ""}
                &nbsp;&nbsp;
              </span>
              <BiChevronDown style={{ fontSize: 16, color: "white" }} />
              <div
                className={styles.profile_card}
                style={{ display: display4 }}
              >
                <div
                  className={styles.dp + " overflow-hidden"}
                  style={{
                    backgroundImage: `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.company.profilePicture})`,
                  }}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.company.profilePicture}`}
                    width={500}
                    height={500}
                    blurDataURL="/loadImg.gif"
                    placeholder="blur"
                    alt="user dp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className={styles.name}>
                  {props.company ? `${props.company.companyname} ` : ""}
                </h1>
                <p className={styles.number}>
                  {props.company ? props.company.companyphone : ""}
                </p>
                <Link
                  className={styles.btn}
                  href={`/company/${props.company.uid}`}
                >
                  My Profile
                </Link>
                <Link className={styles.btn} href="/profile-setting">
                  Dashboard
                </Link>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </li>
          )}
        </ul>
        <div className="flex flex-col gap-3 p-2 md:hidden">
          <div>
            <h3 className="text-[1.4rem] py-[0.35rem] capitalize">
              find us on
            </h3>
          </div>
          <div className="flex gap-2">
            <Link
              href="https://www.facebook.com/people/Fipezo/100094694632348/?mibextid=ZbWKwL"
              target="_blank"
            >
              <Image
                src="/fb-white.png"
                alt="facebook"
                width={40}
                height={40}
                blurDataURL="/loadImg.gif"
                placeholder="blur"
                className={styles.social}
              ></Image>
            </Link>
            <Link href="https://www.instagram.com/fipezoindia" target="_blank">
              <Image
                src="/Instagram-white.png"
                alt="Instagram"
                width={40}
                height={40}
                className={styles.social}
              ></Image>
            </Link>
            <Link href="https://twitter.com/fipezoindia" target="_blank">
              <Image
                src="/twitter-white.png"
                alt="Twitter"
                width={40}
                height={40}
                blurDataURL="/loadImg.gif"
                placeholder="blur"
                className={styles.social}
              ></Image>
            </Link>
            <Link href="https://in.pinterest.com/fipezoindia" target="_blank">
              <Image
                src="/Pinterest-white.png"
                alt="Pinterest"
                width={40}
                height={40}
                className={styles.social}
              ></Image>
            </Link>
            <Link href="https://www.youtube.com/@Fipezo" target="_blank">
              <Image
                src="/youtube-black.png"
                alt="Youtube"
                width={40}
                height={40}
                className={styles.social}
              ></Image>
            </Link>
            <Link href="https://www.linkedin.com/in/fipezo" target="_blank">
              <Image
                src="/linkedIn-black.png"
                alt="Linkedin"
                width={40}
                height={40}
                className={styles.social}
              ></Image>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[10rem] md:hidden">
          <div className={styles.google_play}>
            <Link href="/google_play">
              <Image
                src="/google_play_nav.png"
                alt="Google Play"
                width={130}
                height={130}
              ></Image>
            </Link>
          </div>
          <div className={styles.app_store}>
            <Link href="/app_store">
              <Image
                src="/apple-png.png"
                alt="App Store"
                width={143}
                height={143}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
