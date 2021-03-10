import { addItem, editItem } from './../../redux/actions/items';
import { modalToggle } from '../../redux/actions/modal';
import validate from './formValidate';

export const formSubmitHandler = (formData, dispatch, id) => {
  const formDataResult = {};
  for (let formElementId in formData.formControls) {
    formDataResult[formElementId] = formData.formControls[formElementId].inputAttr.value;
  }
  if (id) {
    dispatch(editItem(formDataResult, id));
  } else {
    dispatch(addItem(formDataResult));
  }
  dispatch(modalToggle());
};
export const changeHandler = (event, formData, setFormData) => {
  const name = event.target.name;
  const value = event.target.value;

  const updatedControls = {
    ...formData.formControls,
  };
  const updatedFormElement = {
    ...updatedControls[name],
  };

  if (updatedFormElement.type && updatedFormElement.type === 'imageUpload') {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        updatedFormElement.inputAttr.value = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  } else {
    updatedFormElement.inputAttr.value = value;
  }
  updatedFormElement.inputAttr.touched = true;
  updatedFormElement.inputAttr.valid = validate(value, updatedFormElement.validationRules);

  updatedControls[name] = updatedFormElement;

  let formIsValid = true;
  for (let inputIdentifier in updatedControls) {
    formIsValid = updatedControls[inputIdentifier].inputAttr.valid && formIsValid;
  }
  setFormData(prevState => {
    return {
      ...prevState,
      formControls: updatedControls,
      formIsValid: formIsValid,
    };
  });
};
