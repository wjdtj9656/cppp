import { Box, Button, Pagination, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import { saveComment } from "../../Api/Comment/comment";
import { getUserByNickname } from "../../Api/Cyphers/cyphersUser";
import colorTheme from "../../theme/colorTheme";
import styles from "./UserInfo.module.css";
const UserInfo = () => {
  const location = useLocation();
  const nickname = location.state.nickname;
  const [chat, setChat] = useState(["haha", "haha2"]);
  const [text, setText] = useState("");
  return (
    <Box className={styles.userMain}>
      <Box className={styles.userInfo}>
        <Typography sx={{ fontSize: 50, paddingTop: 20 }}>{nickname}</Typography>
        <Box sx={{ paddingTop: 5 }}>
          <ThemeProvider theme={colorTheme}>
            <TextField
              id="outlined-multiline-flexible"
              color="default"
              multiline
              maxRows={5}
              className={styles.inputBox}
              placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 통보없이 삭제됩니다."
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
          </ThemeProvider>
        </Box>
        <Button
          sx={{
            width: 300,
            color: "black",
            border: "1px solid black",
            floodColor: "black",
          }}
          onClick={async () => {
            //빈 값
            if (!text) return;
            const userData = await getUserByNickname(nickname);
            const userInfo = userData[0];
            saveComment(userInfo.playerId, text);
            setChat([...chat, text]);
            setText("");
          }}
        >
          작성하기
        </Button>
        <Box>
          {chat.map((v) => (
            <Box className={styles.logBoard}>{v}</Box>
          ))}
        </Box>
        <Pagination count={10} size="small" />
        {/* <Box className={styles.logBoard}>{chat.forEach((v) => v)}</Box> */}
      </Box>
    </Box>
  );
};
export default UserInfo;
