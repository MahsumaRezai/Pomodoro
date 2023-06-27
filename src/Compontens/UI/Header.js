import classes from './Header.module.css'
const Header = (porps => {
    return (
        <div className={classes.title}>
            <h2 className={classes.text}>Pomodoro Clock</h2>
        </div>
    )
})
export default Header;