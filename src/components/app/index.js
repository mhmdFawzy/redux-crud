import React from 'react';

import useClickOutside from '../../hooks/useClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggle } from '../../redux/actions/modal';
import AppPresent from './AppPresentational ';
function App() {
  const {
    items: { itemsById },
    modal,
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const modalRef = React.useRef();
  useClickOutside(modalRef, () => {
    dispatch(modalToggle());
  });
  return (
    <AppPresent
      itemsById={itemsById}
      modal={modal}
      dispatch={dispatch}
      modalToggle={modalToggle}
      modalRef={modalRef}
    />
  );
}

export default App;
