import { addItem, clearCurrentItem, editItem } from './../../redux/actions/items';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { modalToggle } from '../../redux/actions/modal';
import styles from './FormModal.module.scss';
import { uploadImg } from './formHandlers';
import { useForm } from 'react-hook-form';

function Form(props, ref) {
  const [update, setUpdate] = React.useState(false);
  const { register, handleSubmit, errors, setValue, getValues } = useForm({ mode: 'onTouched' });
  const dispatch = useDispatch();
  const {
    items: { currentItem },
  } = useSelector(state => state);
  const onSubmit = data => {
    dispatch(addItem(data));
    dispatch(modalToggle());
  };
  React.useEffect(() => {
    ref.current.children[0][0].focus();
  }, []);
  React.useEffect(() => {
    if (
      currentItem &&
      Object.keys(currentItem).length !== 0 &&
      currentItem.constructor === Object
    ) {
      [
        { name: 'Name', value: currentItem.Name },
        { name: 'Description', value: currentItem.Description },
        { name: 'inStock', value: currentItem.inStock },
        { name: 'Categories', value: currentItem.Categories },
        { name: 'ItemImg', value: currentItem.ItemImg },
        { name: 'ItemImgUrl', value: currentItem.ItemImgUrl },
      ].forEach(({ name, value }) => setValue(name, value));
      setUpdate(true);
    }
  }, [currentItem]);

  return (
    <div className={styles.modal} ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modal__form}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            id="Name"
            ref={register({ required: true, minLength: 4, maxLength: 80 })}
          />
          <small>Must be 4 char at least </small>
          {errors?.Name?.type === 'required' && (
            <p className={styles.modal__form__error}>This field is required</p>
          )}
          {errors?.Name?.type === 'minLength' && (
            <p className={styles.modal__form__error}>This field must be more than 4 char</p>
          )}
        </div>
        <div>
          <label htmlFor="Description">Description</label>
          <textarea
            name="Description"
            id="Description"
            ref={register({ required: true, minLength: 30, maxLength: 150 })}
          />
          <small>Must be 30 char at least </small>
          {errors?.Description?.type === 'required' && (
            <p className={styles.modal__form__error}>This field is required</p>
          )}
          {errors?.Description?.type === 'minLength' && (
            <p className={styles.modal__form__error}>This field must be more than 30 char</p>
          )}
        </div>
        <div>
          <div className={styles.modal__form__radio}>
            <input
              id="avaliable"
              name="inStock"
              type="radio"
              value="Yes"
              ref={register({ required: true })}
            />
            <label htmlFor="avaliable">Avaliable</label>
          </div>
          <div className={styles.modal__form__radio}>
            <input
              id="notavaliable"
              name="inStock"
              type="radio"
              value="No"
              ref={register({ required: true })}
            />
            <label htmlFor="notavaliable">Not avaliable</label>
          </div>
          {errors?.inStock?.type === 'required' && (
            <p className={styles.modal__form__error}>This field is required</p>
          )}
        </div>
        <div>
          <label htmlFor="Categories">Categories</label>
          <select
            name="Categories"
            id="Categories"
            ref={register({ required: true })}
            defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="G2K">G2K</option>
            <option value="K2G">K2G</option>
          </select>
          {errors?.Categories?.type === 'required' && (
            <p className={styles.modal__form__error}>This field is required</p>
          )}
        </div>
        <div>
          <input
            ref={register({ required: true })}
            type="file"
            name="ItemImg"
            onChange={e => {
              uploadImg(e, setValue);
            }}
          />
          {errors?.ItemImg?.type === 'required' && (
            <p className={styles.modal__form__error}>This field is required</p>
          )}
          <input ref={register({ required: true })} type="hidden" name="ItemImgUrl" />
        </div>
        {update ? (
          <button
            onClick={e => {
              e.preventDefault();
              dispatch(editItem(getValues(), currentItem.id));
              dispatch(clearCurrentItem());
              dispatch(modalToggle());
            }}>
            Update
          </button>
        ) : (
          <button>Submit</button>
        )}
      </form>
    </div>
  );
}
export default React.forwardRef(Form);
