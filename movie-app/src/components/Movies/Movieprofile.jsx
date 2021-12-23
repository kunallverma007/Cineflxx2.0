import axios from "axios";
import React, { useEffect, useState } from "react";

import "./new.css"
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory,useParams } from "react-router-dom";

function Profile() {
  let history = useHistory();
  const {_id} = useParams();
  const [movieData, setMovieData] = useState([]);  
  const [circle, setCircle] = useState("");
  const [castData, setCastData] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [links, setLinks] = useState("");
  const [helpcolor, setHelpcolor] = useState("white");
  var type=localStorage.getItem("type")
  const hideModal = () => {
    setIsOpen(false);
  };


  const apiii = async () => {
    try {
      const Mdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${_id}?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
      );
      const Cdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${_id}/credits?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
      );
      const linkdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${_id}/external_ids?api_key=7372ae765660f35a9b2e71883bb705a5`
      );

      setMovieData(Mdata.data);
      setCircle(`${Mdata.data.vote_average * 10},100`);
      setCastData(Cdata.data.cast);
      setLinks(linkdata.data);

    
    } catch (err) {
      console.log(err.message);
    }
  };

  const showModal = async () => {
    try {
      const response = await axios.get(
        `http://api.themoviedb.org/3/movie/${_id}/videos?api_key=7372ae765660f35a9b2e71883bb705a5`
      );
      setQuery(response.data.results[0].key);
      setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  
  const trailerPlayer=async (x)=>{
    console.log(x);
    try{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${x}/videos?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`)
      setQuery(response.data.results[0].key);  
      console.log(query)
      
      var url=`https://www.youtube.com/embed/${query}`
      console.log(url)
      window.open(url, '_blank');        
    }
    catch(err){
      console.log(err);
    }      
    
    
  }
  const showTheater=()=>{

    var url="/show_movie"+"/"+_id.toString();
    history.push(url);
    
}
const addBooking=()=>{
    var url="/conc"+"/"+_id.toString();
    history.push(url);
}
  useEffect(() => {
    if(movieData.length==0)
    {
      console.log("hello");
      apiii();
      console.log(movieData);
    }
    else{
      console.log("iskeniche")
      console.log(movieData.length); 
    }
  }, [movieData]);

  return (
    <div>
      {castData.length ? (
        <>
        <div
          style={{ backgroundColor: "black", margin: "0px", padding: "0px" }}
        >
          <div>
            <div
              className="peopleback"
              style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path})`,
              }}
            ></div>
            <div className="overlay"></div>
            <div className="movieprofilename">
              <h1>{movieData.original_title}</h1>
              <p className="genres">{movieData.release_date}&nbsp;&nbsp;</p>
              <p style={{ display: "inline", fontSize: "50px" }}>
                &dagger;&nbsp;
              </p>
              {movieData.genres !== undefined
                ? movieData.genres.map((x) => {
                    return <p className="genres">{x.name}&nbsp;,&nbsp;</p>;
                  })
                : ""}
              <p style={{ display: "inline", fontSize: "50px" }}>
                &dagger;&nbsp;
              </p>
              <p className="genres">
                {parseInt(movieData.runtime / 60)}h&nbsp;
                {movieData.runtime % 60}m
              </p>
              <br />
              <svg viewBox="0 0 36 36" className="circular-chart2">
                <path
                  className="circle2"
                  stroke-dasharray="100, 100"
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path
                  class="circle"
                  stroke-dasharray={circle}
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="votecircle">
                <h3 className="votevalue">{movieData.vote_average * 10}%</h3>
              </div>
              <div>
              <p
                style={{
                  fontFamily: "Lato",
                  fontSize: "20px",
                  color: "white",
                  display: "inline",
                }}
              >
                Rating
              </p>
              
              <p
                style={{ display: "inline", marginLeft: "2%" }}
                className="trailer"
              >
                <a onClick={() => trailerPlayer(_id )}>
                  <a
                    className="icon-caret-right"
                    onClick={() => trailerPlayer(_id)}
                    style={{ marginTop: "4px" }}
                  ></a>{" "}
                  Play Trailer
                </a>
               
                  
              </p>
              <div className="text-box" style={{ display: "inline", marginLeft: "2%" }}>
                    {
                 
                        (type==="user")?<button type="submit"  onClick={addBooking}>Watch Now</button>:<button type="submit"  onClick={showTheater}>Show Now</button>
                    }
                    </div>
              </div>
              
              <br />
              <br />
              <h3>Overview</h3>
              <p style={{ color: "white", fontSize: "19px", maxWidth: "80%" }}>
                {movieData.overview}
              </p>
            </div>
            <div className="movieprofile">
              <img
                src={
                  `https://www.themoviedb.org/t/p/w300_and_h450_face${movieData.poster_path}`
                }
                className="profileimage"
              />
            </div>
          </div>
          <div className="belowbac">
            <h3
              style={{
                marginTop: "2%",
                marginLeft: "6%",
                fontFamily: "Josefin Sans",
                color: "white",
              }}
            >
              Top Billed Cast
            </h3>
            <div style={{ marginLeft: "6%" }}>
              <div
                className="scrolling-wrapper3"
                style={{ marginTop: "-2%" }}
                id="ex3"
              >
                <div style={{ margin: "0px" }}>
                  {castData.map((x) => {
                    if (x.profile_path != null) {
                      return (
                        <div
                          className="horizontalcomponent2"
                          style={{ zIndex: "9", marginTop: "3%" }}
                        >
                          <input
                            type="Image"
                            src={`https://www.themoviedb.org/t/p/w150_and_h225_multi_faces${x.profile_path}`}
                            style={{ width: "150px", height: "230px" }}
                            className="imagebutton2"
                            
                          ></input>
                          <p
                            className="mons"
                            style={{ fontSize: "15px", color: "white" }}
                          >
                            {x.name}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "5%", marginTop: "2%" }}>
              <a
                className="icon-facebook"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.facebook.com/${links.facebook_id}`}
              ></a>
              <a
                className="icon-twitter"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.twitter.com/${links.twitter_id}`}
              ></a>
              <a
                className="icon-instagram"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.instagram.com/${links.instagram_id}`}
              ></a>
            </div>

            <div
              style={{
                width: "80%",
                height: "20vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginLeft: "7%", marginTop: "1%" }}>
                <p className="status">Status:</p>
                <p className="statusval">{movieData.status}</p>
              </div>
              <div>
                <p className="status">Budget: </p>
                <p className="statusval">
                  ${parseInt(movieData.budget).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="status">Revenue:</p>
                <p className="statusval">
                  ${parseInt(movieData.revenue).toLocaleString()}
                </p>
              </div>
            </div>
            <Modal show={isOpen} onHide={hideModal} size="xl">
              <iframe
                width="100%"
                height="700px"
                src={`https://www.youtube.com/embed/${query}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Modal>
          </div>
        </div>
       </>
       ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;