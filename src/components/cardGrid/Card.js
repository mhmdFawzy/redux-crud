import React from 'react';
import PropTypes from 'prop-types';
import { modalToggle } from '../../redux/actions/modal';

import { useDispatch } from 'react-redux';
import { deleteItem, setCurrentItem } from './../../redux/actions/items';
function Card({ title, description, img, id, style }) {
  const dispatch = useDispatch();

  return (
    <div id={id} className={style}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <img src={img} alt={title} />
      </div>
      <div>
        <button
          className="btn block w-100"
          onClick={() => {
            dispatch(deleteItem(id));
          }}>
          Delete
        </button>
        <button
          className="btn block w-100"
          onClick={() => {
            dispatch(modalToggle());
            dispatch(setCurrentItem(id));
          }}>
          Edit
        </button>
      </div>
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};
export default React.memo(Card);
