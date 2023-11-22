import style from "@/styles/Company_Profile.module.css";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import DeleteBox from "@/components/DeleteBox";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

function Company_Profile(props) {
  const [companyname, setCompanyname] = React.useState("");
  const [companyaddress, setCompanyaddress] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [editProfile, setEditProfile] = React.useState(false);
  const [firstcolor, setFirstcolor] = React.useState("#949494");
  const [lastcolor, setLastcolor] = React.useState("#949494");
  const [biocolor, setBiocolor] = React.useState("#949494");
  const [user, setUser] = React.useState({});
  const [warns, setWarns] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [cover, setCover] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState("");
  const [coverPicture, setCoverPicture] = React.useState("");
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
          setCompanyname(data.user.companyname);
          setProfilePicture(data.user.profilePicture);
          setCoverPicture(data.user.coverPicture);
          setCompanyaddress(data.user.companyaddress);
          setBio(data.user.bio);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("companyname", companyname);
    data.append("companyaddress", companyaddress);
    data.append("profilePicture", profilePicture);
    data.append("coverPicture", coverPicture);
    data.append("bio", bio);
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/company/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
          } else {
            localStorage.setItem("user", JSON.stringify({ token: data.token }));
            setEditProfile(false);
            setCompanyname(data.user.user.companyname);
            setProfilePicture(data.user.user.profilePicture);
            setCoverPicture(data.user.user.coverPicture);
            props.setCompany(data.user.user);
            setCompanyaddress(data.user.user.companyaddress);
            setBio(data.user.user.bio);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function handleImageClick(event) {
    const sibling = event.currentTarget.previousElementSibling;
    if (sibling) {
      sibling.click();
    }
  }

  const handleImageChange = (e, val) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 1048576) {
      setWarns(true);
      return;
    }

    if (val === 1) {
      setProfilePicture(file);
    } else {
      setCoverPicture(file);
    }

    reader.readAsDataURL(file);

    if (val === 1) {
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      reader.onloadend = () => {
        setCover(reader.result);
      };
    }

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/company/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem("user");
            props.setCompany(null);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.setCompany(null);
    router.push("/");
  };

  return (
    <div className={style.profile}>
      <Head>
        <title>Fipezo | Your Profile</title>
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
            <div className={style.form}>
              {!editProfile && (
                <div
                  className={style.coverPicture}
                  style={{
                    backgroundImage: `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${coverPicture})`,
                  }}
                ></div>
              )}
              {!editProfile && (
                <div className={style.profileImage}>
                  <div
                    className={style.dp}
                    style={{
                      backgroundImage: `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture})`,
                    }}
                  ></div>
                </div>
              )}
              {!editProfile && (
                <div className={style.profileInfo}>
                  <h1 className={style.name}>{companyname}</h1>
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
                  <p
                    className={style.option}
                    onClick={() => setEditProfile(true)}
                  >
                    Edit Profile
                  </p>
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
            </div>
          )}
          {editProfile && (
            <div className={style.editProfile}>
              <form
                className={style.form}
                encType="multipart/form-data"
                onSubmit={handleEditProfile}
              >
                <div
                  className={style.editCoverPicture}
                  style={{
                    backgroundImage: `url(${
                      cover
                        ? cover
                        : coverPicture
                        ? `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${user.coverPicture}`
                        : "/dp.png"
                    })`,
                  }}
                >
                  {!cover && (
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
                    name="coverPicture"
                    onChange={(e) => handleImageChange(e, 2)}
                    className={style.fileInput}
                  />
                </div>
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
                    onChange={(e) => handleImageChange(e, 1)}
                    className={style.fileInput}
                  />
                </div>
                <div className={style.editProfileInfo}>
                  <input
                    className={style.input}
                    type="text"
                    value={companyname}
                    onChange={(e) => {
                      setCompanyname(e.target.value);
                      setFirstcolor("black");
                    }}
                    style={{ color: firstcolor }}
                  />
                  <input
                    className={style.input}
                    type="text"
                    value={companyaddress}
                    onChange={(e) => {
                      setCompanyaddress(e.target.value);
                      setLastcolor("black");
                    }}
                    style={{ color: lastcolor }}
                  />
                  <textarea
                    className={style.input}
                    type="text"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      setBiocolor("black");
                    }}
                    style={{ color: biocolor }}
                  ></textarea>
                </div>
                <div className={style.btns}>
                  <button className={style.logout} type="submit">
                    Save
                  </button>
                  <button
                    className={style.back}
                    type="button"
                    onClick={() => setEditProfile(false)}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          )}
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

export default Company_Profile;
