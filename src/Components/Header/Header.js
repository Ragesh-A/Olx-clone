import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const logOut = () => {
    firebase.auth().signOut();
    history.push('/login');
  };
  const login = () => {
    history.push('/login');
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {console.log(user)}
          {user ? user.displayName : <span onClick={login}>login</span>}
          <hr />
        </div>
        {user && <span onClick={logOut}>logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={() => history.push('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
