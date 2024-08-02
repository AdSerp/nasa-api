import React from 'react';

const Figure = ({ url, title, date, copyright, explanation }) => {
  return (
    <div>
      <img src={url} alt={title} style={{ maxWidth: '100%' }} />
      <h2>{title}</h2>
      <div>
        <p>Fecha: {date}</p>
        {copyright && <p>Copyright: {copyright}</p>}
      </div>
      <p>{explanation}</p>
    </div>
  );
};

export default Figure;
