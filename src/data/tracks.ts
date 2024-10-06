// audio files
import introduction from './introduction.mp3';
import blockbuster from './blockbuster.mp3';
import muaziz from './MuazizSaarif.mp3';
import awaam from './awaam.mp3';
import nazar from './nazar.mp3';
import lafz from './lafz.mp3';
import felony from './felony.mp3';
import love from './love.mp3';
import jevin from './jevin.mp3';
import runnin from './runnin.mp3';
import aliii from './aliii.mp3';
import jhooom from './jhooom.mp3';
import asimmm from './asimmm.mp3';
import soneyaa from './soneyaa.mp3';
import galat from './GalatFehmi.mp3';

// audio thumbnails
import awam from './awam.jpg';
import sarif from './sarif.jpg';
import buster from './buster.png';
import intro from './intro.png';
import nazaar from './nazar.jpg';
import laafz from './lafz.jpg';
import felonyy from './felonyy.jpg';
import lovee from './lovee.png';
import jevinn from './jevinn.jpg';
import running from './running.png';
import ali from './ali.png';
import jhoom from './jhoom.png';
import asim from './asim.jpg';
import soneya from './soneya.png';
import GalatFehmi from './galat.png';




export interface Track {
  id: number;
  title: string;
  src: string;
  author: string;
  thumbnail: string;
  artist: string; // Add this line
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Introduction",
    src: introduction,
    author: "by Faris Shafi",
    thumbnail: intro,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 2,
    title: "Blockbuster",
    src: blockbuster,
    author: "by Faris Shafi",
    thumbnail: buster,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 3,
    title: "Muaziz Sarrif",
    src: muaziz,
    author: "by Faris Shafi",
    thumbnail: sarif,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 4,
    title: "Faris Shafi - Awaam (Feat. Mooroo)",
    src: awaam,
    author: "by Faris Shafi",
    thumbnail: awam,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 5,
    title: "Nazar -Faris Shafi",
    src: nazar,
    author: "by Faris Shafi",
    thumbnail: nazaar,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 6,
    title: "Lafz",
    src: lafz,
    author: "by Faris Shafi",
    thumbnail: laafz,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 7,
    title: "Felony",
    src: felony,
    author: "by Faris Shafi",
    thumbnail: felonyy,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 8,
    title: "With Love",
    src: love,
    author: "by Faris Shafi",
    thumbnail: lovee,
    artist: "Faris Shafi", // Add this line
  },
  {
    id: 9,
    title: "Jevin Gill",
    src: jevin,
    author: "by Talha Anjum",
    thumbnail: jevinn,
    artist: "Talha Anjum", // Add this line
  },
  {
    id: 10,
    title: "Runnin",
    src: runnin,
    author: "by Jokhay JJ47",
    thumbnail: running,
    artist: "Jokhay JJ47", // Add this line
  },
  {
    id: 11,
    title: "Balag Ul Ullah ",
    src: aliii,
    author: "by Ali Zafar",
    thumbnail: ali,
    artist: "Ali Zafar", // Add this line
  },
  {
    id: 12,
    title: "Jhoom",
    src: jhooom,
    author: "by Ali Zafar",
    thumbnail: jhoom,
    artist: "Ali Zafar", // Add this line
  },
  {
    id: 13,
    title: "Jo Tu Na Mila Mujhey",
    src: asimmm,
    author: "by Asim Azhar",
    thumbnail: asim,
    artist: "Asim Azhar", // Add this line
  },
  {
    id: 14,
    title: "Soneya",
    src: soneyaa,
    author: "by Asim Azhar",
    thumbnail: soneya,
    artist: "Asim Azhar", // Add this line
  },
  {
    id: 15,
    title: "Galat Fehmi",
    src: galat,
    author: "by Asim Azhar",
    thumbnail: GalatFehmi,
    artist: "Asim Azhar", // Add this line
  },

];

// Add a function to get unique artists
export const getUniqueArtists = (): string[] => {
  const artists = tracks.map(track => track.artist);
  return [...new Set(artists)];
};
