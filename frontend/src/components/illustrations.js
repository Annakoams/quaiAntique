import React, { useEffect, useState } from "react";
import { getData, url_server } from "../lib/api";
import { Motion, spring } from "react-motion";

const Illustration = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [illustrations, setIllustrations] = useState([]);

  useEffect(() => {
    getData("illustrations").then((result) => {
      setIllustrations(result);
    });

    const handleScroll = () => {
      const scrollValue = (window.scrollY + window.innerHeight) / document.body.offsetHeight;

      if (window.innerWidth < 600) {
        if (!animationStarted && scrollValue > 0.15) {
          setAnimationStarted(true);
        } else if (animationStarted && scrollValue < 0.25) {
          setAnimationStarted(false);
        }
      }
      if (window.innerWidth > 600 && window.innerWidth < 1000) {
        if (!animationStarted && scrollValue > 0.35) {
          setAnimationStarted(true);
        } else if (animationStarted && scrollValue < 0.35) {
          setAnimationStarted(false);
        }
      }  else {
        if (!animationStarted && scrollValue > 0.45) {
          setAnimationStarted(true);
        } else if (animationStarted && scrollValue < 0.45) {
          setAnimationStarted(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationStarted]);

  return (
    <section className="container_illustration">
      {illustrations.map((illustration, index) => (
        <Motion
          key={illustration.illustration_id}
          defaultStyle={{ opacity: 0 }}
          style={{ opacity: spring(animationStarted ? 1 : 0), }}
        >
          {(interpolatedStyle) => (
            <div
              className="illustration"
              style={{opacity: interpolatedStyle.opacity,}}
            >
              <div className="title_illustrations">{illustration.title}</div>
              <img
                className="image_illustration"
                src={url_server + illustration.url_picture}
                alt="Des illustrations des plats"
              />
            </div>
          )}
        </Motion>
      ))}
    </section>
  );
};

export default Illustration;
