import { Equipments } from "../Equipments/Equipments";
import { Users } from "../Users/Users";
import ReactPlayer from "react-player";
import './Content.scss';

export const Content = () => {
  return (
    <div className="container">
      <div className="background-video">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=qK7rjAQT2Qg"
          playing
          loop
          volume={0.2}
          width="100%"
          height="95%"
        />
      </div>
      <div className="content-overlay">
        <Users />
        <Equipments />
      </div>
    </div>
  )
}
