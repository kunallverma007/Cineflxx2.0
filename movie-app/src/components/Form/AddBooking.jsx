import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IsAuth } from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import "./AddBooking.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function AddBooking() {
  const { theater_id, movie_id, language, date } = useParams();
  console.log(theater_id, movie_id, language, date);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [severity,setSeverity] = useState("success")
  var options = [];
  var prices = [];
  function RString(str) {
    return str.split("").reverse().join("");
  }

  function current_time() {
    const d = new Date().toString();
    const time = d.split(" ")[4].split(":");
    return parseInt(time[0] + time[1], 10);
  }
  let history = useHistory();
  const [slot, setSlot] = useState();
  const [price, setPrice] = useState();
  async function get() {
    var show = await axios.post("/get_show", {
      theater_id,
      movie_id,
      language,
      date,
    });
    show = show.data;
    let currDate = new Date();

    if (currDate.toISOString().slice(0, 10) === date) {
      var curr = current_time();
    } else {
      var curr = "0000";
    }
    console.log("found");

    show.slots.forEach((en1) => {
      var x = RString(en1);

      var xx = RString(x.substring(0, 2));

      var yy = RString(x.substring(2));
      yy = yy.concat(":");

      yy = yy.concat(xx);
      console.log(en1);
      if (en1 > curr) {
        options.push({ value: en1, label: yy });
      }
    });
    if (options.length===0){




      setText("Sorry no slot available on the date!!");
      setOpen(true);
      setSeverity("warning")
    }
    show.prices.forEach((en1) => {
      prices.push({ value: en1, label: en1 });
    });
  }
  async function submit() {
    try {
      var { auth, type, user } = await IsAuth();
      if (slot===undefined || price ===undefined) {
        setText("Time Price can't be empty Please fill!!");
        setOpen(true);
        setSeverity("warning")
        return;
      }
      await axios.post("/booking_add", {
        user,
        movie_id,
        theater: theater_id,
        slot: slot.value,
        pack: price.value,
        language,
        date: new Date(),
      });
      setText("Booking is added successfully redirecting in 6 secs");
      setOpen(true);
      setSeverity("success")
      await new Promise((r) => setTimeout(r, 4000));
      history.push("/");
    } catch (err) {
      console.log(err);
      setText(err);
      setOpen(true);
      setSeverity("error")
    }
  }

  useEffect(() => {
    get();
  }, [slot, price]);

  return (
    <div className="addBooking">
      <span className="addBookingTitle">Ticket Booking Details</span>
      <div className="addBookingForm">
        <label>Choose Time Slot: </label>
        <Select
          className="addBookingClass"
          options={options}
          onChange={(value) => {
            setSlot(value);
          }}
        />
        <label>Choose Ticket Price: </label>
        <Select
          className="addBookingClass"
          options={prices}
          onChange={(value) => {
            setPrice(value);
          }}
        />
        <button className="addBookingbutton" type="submit" onClick={submit}>
          Submit
        </button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={severity}
          sx={{ width: "400px", fontSize: "20px" }}
        >
          <AlertTitle sx={{ fontSize: "20px" }}> {severity} </AlertTitle>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddBooking;
