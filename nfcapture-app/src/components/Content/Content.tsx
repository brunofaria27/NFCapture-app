import { Equipments } from "../Equipments/Equipments";
import { Users } from "../Users/Users";
import './Content.scss';

export const Content = () => {
  return (
    <div className="container">
        <Users />
        <Equipments />
    </div>
  )
}