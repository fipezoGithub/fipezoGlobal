import React from "react";
import style from "../styles/User_profile.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import DeleteBox from "@/components/DeleteBox";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "@/components/Loading";

function User_profile(props) {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [editProfile, setEditProfile] = React.useState(false);
  const [firstcolor, setFirstcolor] = React.useState("#949494");
  const [lastcolor, setLastcolor] = React.useState("#949494");
  const [user, setUser] = React.useState({});
  const [warns, setWarns] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showDeleteBox, setShowDeleteBox] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setFirstname(data.user.firstname);
          setLastname(data.user.lastname);
          setEmail(data.user.email);
          if (data.user.profilePicture)
            setProfilePicture(data.user.profilePicture);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    if (password !== undefined) {
      data.append("password", password);
    }
    if (profilePicture !== null && typeof profilePicture !== "string") {
      data.append("profilePicture", profilePicture);
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/user/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setLoading(false);
          } else {
            localStorage.setItem("user", JSON.stringify({ token: data.token }));
            setEditProfile(false);
            setFirstname(data.user.user.firstname);
            setLastname(data.user.user.lastname);
            props.setUser(data.user.user);
            setProfilePicture(data.user.user.profilePicture);
            setEditProfile(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  function handleImageClick(event) {
    const sibling = event.currentTarget.previousElementSibling;
    if (sibling) {
      sibling.click();
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 1048576) {
      props.setWarns(true);
      return;
    }

    setProfilePicture(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.setUser(null);
    router.push("/");
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/user/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem("user");
            props.setUser(null);
            router.push("/");
          } else {
            console.log("Error deleting user profile");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className={style.profile}>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={style.body}>
        <div className={style.profileBox}>
          {!editProfile && (
            <div className={style.profileImage}>
              {/* <Image className={style.dp} src={profilePicture === '' ? '/dp.png' : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`} alt="profile-pic" height='100' width='100' /> */}
              <div
                className={style.editProfileImage}
                style={{
                  backgroundImage: `url('${
                    image
                      ? image
                      : profilePicture
                      ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`
                      : "/dp.png"
                  }')`,
                }}
              ></div>
            </div>
          )}
          {!editProfile && (
            <div className={style.profileInfo}>
              <h1 className={style.name}>
                {firstname} {lastname}
              </h1>
              <p className={style.phone}>
                <span className={style.phoneValue}>{user.phone}</span>
              </p>
            </div>
          )}
          {!editProfile && (
            <div className={style.options}>
              <Link className={style.option} href="/my_hires">
                Hire Requests
              </Link>
              <p className={style.option} onClick={() => setEditProfile(true)}>
                Edit Profile
              </p>
              <Link className={style.option} href="/my_referral">
                My Referal
              </Link>
              <p
                className={style.option}
                onClick={() => setShowDeleteBox(true)}
              >
                Delete Account
              </p>
              <Link
                target="_blank"
                href="https://www.facebook.com/profile.php?id=100094694632348&sk=reviews"
                className={style.option}
              >
                Rate our Services
              </Link>
            </div>
          )}
          {!editProfile && (
            <div>
              <button className={style.logout} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {editProfile &&
            (loading === false ? (
              <div className={style.editProfile}>
                <form
                  className={style.form}
                  encType="multipart/form-data"
                  onSubmit={handleEditProfile}
                >
                  <div
                    className={style.editProfileImage}
                    style={{
                      backgroundImage: `url(${
                        image
                          ? image
                          : profilePicture
                          ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`
                          : "/dp.png"
                      })`,
                    }}
                  >
                    {!image && (
                      <Image
                        className={style.camera}
                        id={style.camera}
                        src="/cameraIcon.png"
                        width={35}
                        height={35}
                        alt="camera"
                        onClick={handleImageClick}
                      />
                    )}
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      name="profilePicture"
                      onChange={handleImageChange}
                      className={style.fileInput}
                    />
                  </div>
                  <div className={style.editProfileInfo}>
                    <input
                      className={style.input}
                      type="text"
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                        setFirstcolor("black");
                      }}
                      style={{ color: firstcolor }}
                    />
                    <input
                      className={style.input}
                      type="text"
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                        setLastcolor("black");
                      }}
                      style={{ color: lastcolor }}
                    />
                    <input
                      className={style.input}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setLastcolor("black");
                      }}
                      style={{ color: lastcolor }}
                    />
                    <input
                      className={style.input}
                      type="password"
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <input
                      className={style.input}
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className={style.btns}>
                    <button
                      className={style.back}
                      type="button"
                      onClick={() => setEditProfile(false)}
                    >
                      Back
                    </button>
                    <button className={style.logout} type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <Loading message={"Update your profile"} />
            ))}
          {showDeleteBox && (
            <div className={style.deleteBox}>
              <DeleteBox
                setShowDeleteBox={setShowDeleteBox}
                handleDeleteAccount={handleDeleteAccount}
                delete="Account"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User_profile;
