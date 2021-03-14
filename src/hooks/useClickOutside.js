import React from 'react';
import { clearCurrentItem } from '../redux/actions/items';
import { useDispatch } from 'react-redux';

function useClickOutside(ref, handler) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
      dispatch(clearCurrentItem());
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
