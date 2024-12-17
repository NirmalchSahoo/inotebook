import React from 'react';

const Noteitem = (props) => {
  const { note } = props;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-1">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} lorem</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
