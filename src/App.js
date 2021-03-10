import React from 'react';
const Modal = React.lazy(() => import('./components/form'));
const CardGrid = React.lazy(() => import('./components/cardGrid'));

import useClickOutside from './hooks/useClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggle } from './redux/actions/modal';
function App() {
  const {
    items: { items },
    modal,
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const modalRef = React.useRef();
  useClickOutside(modalRef, () => {
    dispatch(modalToggle());
  });
  return (
    <main className="main">
      <header className="header">
        <button
          className="btn btn--large"
          onClick={() => {
            dispatch(modalToggle());
          }}>
          Add +
        </button>
      </header>
      <React.Suspense fallback={<div>Loading...</div>}>
        {modal && <Modal ref={modalRef} />}
        <CardGrid items={items} />
      </React.Suspense>
    </main>
  );
}

export default App;
