import React from "react";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import { useRouter } from "next/router";

export default function HomeButton({ fabClass }) {
  const router = useRouter();

  return (
    <>
      <Fab color="primary" aria-label="add" className={fabClass}>
        <HomeIcon onClick={() => router.push("/")} />
      </Fab>
    </>
  );
}
