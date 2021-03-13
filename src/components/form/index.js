import React from 'react';
import styles from './FormModal.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearCurrentItem } from './../../redux/actions/items';
// import { modalToggle } from './../../redux/actions/modal';
import { useForm } from 'react-hook-form';

function Form(props, ref) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

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

        <input type="submit" />
      </form>
    </div>
  );
}
export default React.forwardRef(Form);
