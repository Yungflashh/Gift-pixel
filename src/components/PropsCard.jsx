// import React from 'react';
import Button from "../components/Button";
import { PiShareFill } from "react-icons/pi";
import "../../src/styles/PropsCard.css";

const PropsCard = ({ title, desc , }) => {
  return (
    <div className="props-card">
      <div className="props-card-header">
        <h2>{title}</h2>
        <div className="props-card-content">
          <p>{desc}</p>
          <div className="share">
            <Button label="share" styleClass="share-button"/>
            <PiShareFill className="share-icon" />
        </div>
        </div>
      </div>
      <Button label="+ Add To List" styleClass="add-to-list-button" />
    </div>
  );
};

export default PropsCard;
