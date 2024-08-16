import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import s from './HeaderComponent.module.css'

const HeaderComponent = () => {
    return (
        <div className={s.header}>
            <Navbar />
            <Profile />
        </div>
    )
}

export default HeaderComponent
