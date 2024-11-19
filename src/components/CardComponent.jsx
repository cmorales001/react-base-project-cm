import React from 'react';

const CardComponent = ({ title, imageUrl}) => {
  return (
    <div >
      {imageUrl && <img src={imageUrl} alt={title}  />}      
    </div>
  );
};
export default CardComponent;