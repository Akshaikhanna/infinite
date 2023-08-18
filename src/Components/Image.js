import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css";
import ScrollToTop from "react-scroll-to-top";
import { LuLoader2 } from "react-icons/lu";

function Image() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=86OfNdb-ans_NiZm-9nJCgBPMYV69ouH-zZ-j-2x8t0`
      );
      setImages((prevImages) => [...prevImages, ...response.data]);
      setPage((prevPage) => prevPage + 1);
      setTimeout(() => {
        setLoad(false);
      }, 500);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 500 &&
      !loading
    ) {
      setLoad(true);
      setLoading(true);
      fetchImages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  //window.removeeventListener("scroll", handleScroll);
  // },[])

  useEffect(() => {
    // setImages([]);
    // setPage(1)
    fetchImages();
  }, []);

  return (
    <div>
      {/* -------------------------search-------------------------- */}
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
      </div>
      <div className="image-gallery">
        {images
          .filter((image) => {
            return search.toLowerCase() === ""
              ? image
              : image.user.name.toLowerCase().includes(search);
          })
          .map((image, index) => (
            <Card
              key={index}
              imageUrl={image.urls.regular}
              author={image.user.name}
            />
          ))}

        {/* ------------------------------------------------ Loader -------------------------------------------------------- */}
        {load && (
          <div className="icon">
            <LuLoader2 className="luloader" />
          </div>
        )}
        {loading && <div>Loading...</div>}
        {error && <div>Error fetching</div>}
      </div>
      <div />
      {/* -----------------------------------------------------ScrollTop------------------------------------------------------ */}
      <div className="top">
        <ScrollToTop smooth color="#ffffff" className="scrolltop" />
      </div>
    </div>
  );
}
export default Image;