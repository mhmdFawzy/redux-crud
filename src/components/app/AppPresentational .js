import React from 'react';
const Modal = React.lazy(() => import('../form'));
const CardGrid = React.lazy(() => import('../cardGrid'));
import PropTypes from 'prop-types';

function AppPresent({ itemsById, modal, dispatch, modalToggle, modalRef }) {
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
        <CardGrid items={itemsById} />
      </React.Suspense>
    </main>
  );
}
AppPresent.propTypes = {
  itemsById: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  modalToggle: PropTypes.func.isRequired,
  modalRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
export default AppPresent;
