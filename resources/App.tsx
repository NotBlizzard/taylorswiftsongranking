import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

interface Albums {
  [song: string]: {
    rank: number;
    album: string;
  };
}

interface Album {
  average: number;
  name: string;
  songs: {
    song: string;
    rank: number;
  }[];
}

interface AlbumsSorted {
  [album: string]: Album;
}

const useStyles = makeStyles((theme: Theme) => ({
  topTen: {
    color: "green",
  },
  button: {
    backgroundColor: "#73eaa7",
    marginTop: "1rem",
  },
  link: {
    textDecorationColor: "#0da24e",
    color: "#000",
  },
}));
const music = {
  "Taylor Swift": [
    "tim mcgraw",
    "ticture to urn",
    "teardrops on my guitar",
    "a place in this world",
    "cold as you",
    "the outside",
    "tied together with a smile",
    "stay beautiful",
    "should've said no",
    "mary's song (oh my my my)",
    "our song",
    "i'm only me when i'm with you",
    "invisible",
    "a perfectly good heart",
  ],
  Fearless: [
    "jump then fall",
    "untouchable",
    "forever & always - piano version",
    "come in with the rain",
    "superstar",
    "the other side of the door",
    "fearless",
    "fifteen",
    "love story",
    "hey stephen",
    "white horse",
    "you belong with me",
    "breathe",
    "tell me why",
    "you're not sorry",
    "the way i loved you",
    "forever and always",
    "the best day",
    "change",
  ],
  "Speak Now": [
    "mine",
    "sparks fly",
    "back to december",
    "speak now",
    "dear john",
    "mean",
    "the story of us",
    "never grow up",
    "enchanted",
    "better than revenge",
    "innocent",
    "haunted",
    "last kiss",
    "long live",
    "ours",
    "if this was a movie",
    "superman",
  ],
  Red: [
    "state of grace",
    "red",
    "treacherous",
    "i knew you were trouble",
    "all too well",
    "22",
    "i almost do",
    "we are never ever getting back together",
    "stay stay stay",
    "the last time",
    "holy ground",
    "sad beautiful tragic",
    "the lucky one",
    "everything has changed",
    "starlight",
    "begin again",
    "the moment i knew",
    "come back...be here",
    "girl at home",
  ],
  "1989": [
    "welcome to new york",
    "blank space",
    "style",
    "out of the woods",
    "all you had to do was stay",
    "shake it off",
    "i wish you would",
    "bad blood",
    "wildest dreams",
    "how you get the girl",
    "this love",
    "i know places",
    "clean",
    "wonderland",
    "you are in love",
    "new romantics",
  ],
  reputation: [
    "...ready for it?",
    "end game",
    "i did something bad",
    "don't blame me",
    "delicate",
    "look what you made me do",
    "so it goes...",
    "gorgeous",
    "getaway car",
    "king of my heart",
    "dancing with our hands tied",
    "dress",
    "this is why we can't have nice things",
    "call it what you want",
    "new year's day",
  ],
  Lover: [
    "i forgot that you existed",
    "cruel summer",
    "lover",
    "the man",
    "the archer",
    "i think he knows",
    "miss americana & the heartbreak prince",
    "paper rings",
    "cornelia street",
    "death by a thousand cuts",
    "london boy",
    "soon you'll get better",
    "false god",
    "you need to calm down",
    "afterglow",
    "me!",
    "it's nice to have a friend",
    "daylight",
  ],
  folklore: [
    "the 1",
    "cardigan",
    "the last great american dynasty",
    "exile (feat. Bon Iver)",
    "my tears ricochet",
    "mirrorball",
    "seven",
    "august",
    "this is me trying",
    "illicit affairs",
    "invisible string",
    "mad woman",
    "epiphany",
    "betty",
    "hoax",
    "the lakes",
  ],
};

const App = (): JSX.Element => {
  const [value, setValue] = useState("");
  const [albums, setAlbums] = useState<Album[]>(null!);

  const classes = useStyles();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const songs = value.split("\n");
    const albums: Albums = {};
    songs.forEach((item) => {
      const rank = item.match(/\d+/g)![0];
      const song = item.split(rank)[1].trimStart();
      // filter out non-album songs
      const includesSong = Object.entries(music).filter((album) => {
        return album[1].includes(song.toLowerCase());
      });
      if (includesSong.length > 0) {
        albums[song] = {
          rank: Number.parseInt(rank),
          album: includesSong[0][0],
        };
      }
    });
    const albumsSorted: AlbumsSorted = {} as AlbumsSorted;

    Object.keys(albums).forEach((song) => {
      const albumName = albums[song].album;
      albumsSorted[albumName] =
        albumsSorted[albumName] ||
        ({
          average: 0,
          name: "",
          songs: [],
        } as Album);
      albumsSorted[albumName].songs.push({
        song,
        rank: albums[song].rank,
      });
      albumsSorted[albumName].songs.sort((a, b) => a.rank - b.rank);
    });

    Object.keys(albumsSorted).forEach((album) => {
      albumsSorted[album].average =
        Math.round(
          _.meanBy(albumsSorted[album].songs, (song) => song.rank) * 100,
        ) / 100;
    });
    const sorted = _.sortBy(albumsSorted, (album) => album.average);
    setAlbums(sorted);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ width: "100%" }}
    >
      <h1>Taylor Swift Song Ranking</h1>
      <h2>
        Paste songs from{" "}
        <a
          className={classes.link}
          href="https://jesseepinkman.tumblr.com/tswiftsong"
        >
          https://jesseepinkman.tumblr.com/tswiftsong
        </a>
      </h2>
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <TextField
          multiline
          value={value}
          onChange={handleChange}
          rows={10}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      {albums && (
        <Box>
          <Grid container>
            {albums.map((album) => (
              <Grid item xs={3}>
                <h1>{album.name}</h1>
                <h2>Average - {album.average}</h2>
                {album.songs.map((song) => (
                  <Typography className={song.rank <= 10 ? classes.topTen : ""}>
                    {song.rank} - {song.song}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
