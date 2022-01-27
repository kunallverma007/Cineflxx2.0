import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingCard.css";
import { useHistory } from "react-router-dom";
function BookingCard(props) {
  const [movie, setMovie] = useState("");
  const [user_name, setUser_name] = useState("");
  const [theater_name, setTheater_name] = useState("");
  let history = useHistory();
  async function get_movie() {
    try {
      if (props.fan === "theater") {
        await get_theater();
      } else {
        await get_user();
      }
      var x = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US`
      );
      setMovie(x.data);
      console.log(14);
    } catch (err) {
      console.log(err);
    }
  }
  async function get_theater() {
    var x = await axios.post("/theater", { _id: props.theater });
    setTheater_name(x.data.username);
    setUser_name(props.user);
  }
  async function get_user() {
    var x = await axios.post("/user", { _id: props.user });
    setUser_name(x.data.username);
    setTheater_name(props.theater);
  }
  async function verify() {
    try {
      await axios.post("/payment", { booking_id: props.booking_id });
      
      history.push("/booking_theater")
    } catch (err) {
      console.log(err);
    }
  }

  async function dele() {
    try {
      await axios.post("/delete_booking", {
        _id: props.booking_id,
        movie_id: props.user_id,
        theater_id: props.theater_id,
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    get_movie();
  }, []);
  console.log(props);

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
      }}
    >
      <div className="innerNew">
        <h4>
          <b>{movie.original_title}</b>
        </h4>{" "}
        <h2>{props.Date}</h2>
        <p>{theater_name}</p> <p>Time : {props.slot}</p>
        <p>Price : {props.pack}</p>
        <p>{user_name}</p>
        <p>Payment Status : {props.payment.toString()}</p>
        <p>{props.booking_id}</p>
      </div>
      {props.type === "1" ? (
        <button className="deleteBtn" onClick={verify}>
          Verify Payment
        </button>
      ) : (
        <div></div>
      )}
      <button className="deleteBtn" onClick={dele}>
        Delete Booking
      </button>
    </div>
  );
}

export default BookingCard;
