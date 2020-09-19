import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

const SaveButton = ({ startDateTime, targetDateTime }) => {
  const classes = useStyles();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Save");

  const onClickHandler = async () => {
    try {
      const {
        data: {
          data: { id },
          message,
        },
      } = await Axios.post("/api/date-time", {
        startDateTime,
        targetDateTime,
      });

      setButtonText("Saved");
      setIsDisabled(true);
      //   router.push(`/${id}`);
    } catch (error) {
      const {
        response: {
          data: { message },
        },
      } = error;
      if (message) {
        alert(message);
      } else {
        alert("API errors occurred");
      }
      console.log(`[POST] Api Errors : ${error} | message : ${message}`);
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
