import { useContext } from "react";
import { themecontext } from "../contexts/ThemeContext";


const Header = ({theme}) => {
  // const [isdark, setIsDark] = useState(JSON.parse(localStorage.getItem("isdarkmood")));
  // const [isdark, setIsDark] = theme
  const [isdark, setIsDark] = useContext(themecontext)

  // if(isdark){
  //   document.body.classList.add("dark");
  // }else{
  //   document.body.classList.remove("dark");
  // }

  return (
    <>
      <header className={`header-container ${isdark ? "dark" : ""}`}>
        <div className='header-content'>
          <h2 className='title'>
            <a href='/'>Where in the world?</a>
          </h2>
          <p
            className='theme-changer'
            onClick={() => {
              setIsDark(!isdark);
              localStorage.setItem("isdarkmood", !isdark)
            }}
          >
            <i className={`fa-solid fa-${isdark ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp;{isdark ? "Light" : "Dark"} Mode
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
