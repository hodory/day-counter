import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

const SaveButton = ({ startTime, targetDateTime }) => {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Save");

  const onClickHandler = async () => {
    setButtonText("Saved");
    setIsDisabled(true);
    try {
      const result = await Axios.post("/api/date-time", {
        startTime,
      });
    } catch (e) {
      alert("API errors occurred");
      console.log(e)
      console.log(`[POST] Api Errors : ${e}`);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={isDisabled}
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => onClickHandler()}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default SaveButton;
