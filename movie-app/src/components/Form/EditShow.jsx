import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IsAuth } from "./../Auth/Auth";
import axios from "axios";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function EditShow(props) {
  const options = [];
  // console.log(props.location.en);
  const movie_id = props.location.en.id;
  let history = useHistory();
  const [timings, setTimings] = useState(props.location.en.slots);
  const [gold, setGold] = useState(props.location.en.prices[1]);
  const [silver, setSilver] = useState(props.location.en.prices[0]);
  const [platinum, setPlatinum] = useState(props.location.en.prices[2]);
  const [language, setLanguage] = useState(props.location.en.language);
  const [from, setFrom] = useState(props.location.en.from);
  const [to, setTo] = useState(props.location.en.to);
  const [open, setOpen] = useState(false);
  const [severity,setSeverity] = useState("success");
  const [text,setText] = useState("")
  console.log(timings, to, from);
  for (var i = 0; i < 24; i++) {
    var time = i.toString() + ":00";
    var i_time = i.toString() + "00";
    var new_time = i.toString() + ":30";
    var i_new_time = i.toString() + "30";
    options.push({ value: i_time, label: time });
    options.push({ value: i_new_time, label: new_time });
  }
  async function submit() {
    if (from > to) {
      setText("from date cant be larger then to date");
      setSeverity("error")
      setOpen(true);
      return;
    }
    const { auth, type, user } = await IsAuth();
    console.log(auth, type, user);
    if (auth === false || type === "user") {
      history.push("/login");
    }
    var time = [];
    timings.forEach((en) => {
      time.push(en.value);
    });
    console.log("time",timings)
    const data = {
      _id: user,
      movie_id: movie_id,
      slot: time,
      prices: [silver, gold, platinum],
      language,
      to,
      from,
      theater_name: props.location.en.username,
      movie_title: props.location.en.title,
    };
    try {
      await axios.post("/edit_show", data);
      setText("Movie is updated successfully redirecting in 6 secs" );
      setSeverity("success")
      setOpen(true);
      await new Promise((r) => setTimeout(r, 4000));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="showTheater">
      <span className="showTheaterTitle">Multiplex Details</span>
      <div className="showTheaterForm">
        <label>Silver : </label>
        <input
          className="showTheaterclass"
          type="number"
          value={silver}
          onChange={({ target }) => {
            setSilver(parseInt(target.value));
          }}
          required
        />
        <label>Gold : </label>
        <input
          className="showTheaterclass"
          type="number"
          value={gold}
          onChange={({ target }) => {
            setGold(parseInt(target.value));
          }}
          required
        />
        <label>Platinum : </label>
        <input
          className="showTheaterclass"
          type="number"
          value={platinum}
          onChange={({ target }) => {
            setPlatinum(parseInt(target.value));
          }}
          required
        />
      </div>
      <div className="showTheaternewForm">
        <label>Timings:</label>
        <Select
          className="showTheaternewclass"
          options={options}
          onChange={(value) => {
            setTimings(value);
          }}
          isMulti
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="From"
          value={from}
          onChange={(newValue) => {
            setFrom(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="To"
          value={to}
          onChange={(newValue) => {
            setTo(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
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

      <button className="showTheaterbutton" type="submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
export default EditShow;
