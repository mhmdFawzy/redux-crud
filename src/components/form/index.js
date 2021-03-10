import React from 'react';
import styles from './FormModal.module.scss';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentItem } from './../../redux/actions/items';
import { modalToggle } from './../../redux/actions/modal';
import { formSubmitHandler, changeHandler } from './formHandlers';
function Form(props, ref) {
  const dispatch = useDispatch();
  const {
    items: { currentItem },
  } = useSelector(state => state);
  const [formData, setFormData] = React.useState({
    update: false,
    formIsValid: false,
    formControls: {
      name: {
        inputAttr: { value: '', placeholder: 'What is the name', valid: false, touched: false },
        validationRules: {
          minLength: 4,
          isRequired: true,
        },
      },
      description: {
        inputAttr: {
          value: '',
          placeholder: 'What is the description',
          valid: false,
          touched: false,
        },
        validationRules: {
          minLength: 30,
          isRequired: true,
        },
      },
      inStock: {
        inputAttr: { value: '', valid: false, touched: false },
        validationRules: {
          isRequired: true,
        },
        options: [
          { value: '1', displayValue: 'In Stock' },
          { value: '0', displayValue: 'Out of Stock' },
        ],
      },
      categories: {
        inputAttr: { value: '', placeholder: 'Select Categories', valid: false, touched: false },
        validationRules: {
          isRequired: true,
        },
        options: [
          { value: '', displayValue: 'Select one', disable: true },
          { value: 'G2K', displayValue: 'G2K' },
          { value: 'K2G', displayValue: 'K2G' },
        ],
      },
      itemImage: {
        type: 'imageUpload',
        inputAttr: { value: '', valid: false, touched: false },
        validationRules: {
          isRequired: true,
        },
      },
    },
  });
  const formDataCopy = { ...formData.formControls };
  const formKeys = Object.keys(formDataCopy);
  const [{ name }, { description }, { inStock }, { categories }, { itemImage }] = formKeys.map(
    key => {
      return {
        [key]: {
          ...formDataCopy[key],
          inputAttr: {
            ...formDataCopy[key].inputAttr,
            value: currentItem[key],
            valid: true,
          },
        },
      };
    }
  );
  React.useEffect(() => {
    if (
      currentItem &&
      Object.keys(currentItem).length !== 0 &&
      currentItem.constructor === Object
    ) {
      setFormData({
        update: true,
        formControls: {
          ...formDataCopy,
          name,
          description,
          inStock,
          categories,
          itemImage,
        },
        formIsValid: true,
      });
    }
  }, [formData.update, currentItem]);
  React.useEffect(() => {
    ref.current.children[0][0].focus();
    return () => {};
  }, []);

  return (
    <div className={styles.modal} ref={ref}>
      <form className={styles.modal__form}>
        <FormInput
          {...formData.formControls.name.inputAttr}
          id="name"
          type="text"
          name="name"
          onChange={event => {
            changeHandler(event, formData, setFormData);
          }}
        />

        <FormInput
          {...formData.formControls.description.inputAttr}
          type="textArea"
          id="description"
          name="description"
          onChange={event => {
            changeHandler(event, formData, setFormData);
          }}
        />

        <FormInput
          {...formData.formControls.categories.inputAttr}
          type="select"
          id="categories"
          name="categories"
          onChange={event => {
            changeHandler(event, formData, setFormData);
          }}
          options={formData.formControls.categories.options}
        />

        <FormInput
          {...formData.formControls.inStock.inputAttr}
          type="radio"
          name="inStock"
          onChange={event => {
            changeHandler(event, formData, setFormData);
          }}
          options={formData.formControls.inStock.options}
        />
        <FormInput
          {...formData.formControls.itemImage.inputAttr}
          type="image"
          name="itemImage"
          onChange={event => {
            changeHandler(event, formData, setFormData);
          }}
        />
        {!formData.update ? (
          <button
            onClick={event => {
              event.preventDefault();
              formSubmitHandler(formData, dispatch);
            }}
            disabled={!formData.formIsValid}>
            Submit
          </button>
        ) : (
          <button
            onClick={event => {
              event.preventDefault();
              formSubmitHandler(formData, dispatch, currentItem.id);
              dispatch(clearCurrentItem());
            }}
            disabled={!formData.formIsValid}>
            Update
          </button>
        )}
      </form>
      <button
        className="btn"
        onClick={() => {
          dispatch(modalToggle());
          formData.update ? dispatch(clearCurrentItem()) : '';
        }}>
        x
      </button>
    </div>
  );
}

export default React.forwardRef(Form);
