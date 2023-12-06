import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Loading from "@/components/Loading";
import { Router } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "@/components/ScrollToTop";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
        console.log("Geolocation is not supported by this browser.");
      }
    }
    function showPosition(position) {
      // x.innerHTML =
      //   "Latitude: " +
      //   position.coords.latitude +
      //   "<br>Longitude: " +
      //   position.coords.longitude;
      console.log(position.coords.latitude, position.coords.longitude);
    }
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // x.innerHTML = "User denied the request for Geolocation.";
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          // x.innerHTML = "Location information is unavailable.";
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          // x.innerHTML = "The request to get user location timed out.";
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          // x.innerHTML = "An unknown error occurred.";
          console.log("An unknown error occurred.");
          break;
      }
    }
    // getLocation();
    // if (!("Notification" in window)) {
    //   console.log("This browser does not support desktop notification");
    // } else {
    //   Notification.requestPermission();
    // }

    // getLocation();

    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
      <div>
        <Head>
          <title>
            Fipezo | Find Freelancers in India & Explore Freelance Jobs - Fipezo
          </title>
          <meta
            name="description"
            content="Search for freelance jobs or Find Freelancers In India on Fipezo, India's best freelance marketplace, connecting you with skilled freelancers."
          />

          <meta property="og:url" content="https://fipezo.com/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Fipezo | Hire Freelancers in your City"
          />
          <meta
            property="og:description"
            content="Discover top freelance talent and job opportunities in India at Fipezo, your premier platform for connecting skilled freelancers with employers. Find the perfect match for your projects or hire your expertise today."
          />
          <meta property="og:image" content={`https://fipezo.com/favi.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="fipezo.com" />
          <meta property="twitter:url" content="https://fipezo.com/" />
          <meta
            name="twitter:title"
            content="Fipezo | Hire Freelancers in your City"
          />
          <meta
            name="twitter:description"
            content="Discover top freelance talent and job opportunities in India at Fipezo, your premier platform for connecting skilled freelancers with employers. Find the perfect match for your projects or hire your expertise today."
          />
          <meta name="twitter:image" content="" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#1f1c1c" />
          <link rel="canonical" href="https://fipezo.com/" />
        </Head>
        <div>
          {loading === false ? (
            <Component
              {...pageProps}
              user={user}
              company={company}
              setCompany={setCompany}
              setUser={setUser}
            />
          ) : (
            <Loading message={"While Loading your data"} />
          )}
          <ScrollToTop />
        </div>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BK5CPZ5W66"
        ></Script>
        <Script
          async
          src="https://code.tidio.co/ystl8iilwvqpmrnk1ma6beua0qwwtray.js"
        ></Script>
        <Script id="google-script">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BK5CPZ5W66');`}
        </Script>
        <Script type="text/javascript" id="ms-clarity">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "irbdme1e1g");`}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WCFD7FM5');`}
        </Script>
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3644814,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </div>
    </GoogleOAuthProvider>
  );
}
