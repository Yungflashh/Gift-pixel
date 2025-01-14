import React from 'react';
import "../../styles/CurrentUserPage.css";
import Button from "../../components/Button.jsx";


const CurrentUserPage = () => {
  return (
    <div className="currentUserContainer">
      <div className="currentUserContent">
        <p className='content'>
          <span>Welcome,</span>&nbsp;<b>@Hamzah👋🏽</b>
        </p>
        <Button label="Create your promise card" styleClass="create-promise-button" />
      </div>
      <div className='currentUserBox'></div>
    </div>
  );
};

export default CurrentUserPage;

