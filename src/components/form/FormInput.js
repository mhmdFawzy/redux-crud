import React from 'react';
import PropTypes from 'prop-types';

function FormInput({ touched, valid, ...restProps }) {
  switch (restProps.type) {
    case 'text':
      return (
        <div className={restProps?.className}>
          <label htmlFor="name">Name</label>
          <input {...restProps} />
          <small>Name must be more than 4 char</small>
        </div>
      );
    case 'textArea':
      return (
        <div className={restProps?.className}>
          <label htmlFor="description">Description</label>
          <textarea {...restProps} />
          <small>Description must be more than 30 char</small>
        </div>
      );
    case 'radio':
      return (
        <div className={restProps?.className}>
          {restProps.options.map(option => (
            <div key={option.value}>
              <label>{option.displayValue}</label>
              <input
                type="radio"
                name={restProps.name}
                value={option.value}
                onChange={restProps.onChange}
                checked={restProps.value === option.value}
              />
            </div>
          ))}
        </div>
      );
    case 'select':
      return (
        <div className={restProps?.className}>
          <label htmlFor="categories">Categories</label>
          <select
            value={restProps.value}
            onChange={restProps.onChange}
            onBlur={restProps.onChange}
            name={restProps.name}>
            {restProps.options.map((option, i) => (
              <option value={option.value} disabled={option?.disable} key={i}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </div>
      );
    case 'image':
      return (
        <div className={restProps.className}>
          <input type="file" accept="image/*" name="itemImage" onChange={restProps.onChange} />
        </div>
      );
    default:
      break;
  }
}
FormInput.propTypes = {
  type: PropTypes.string.isRequired,
};
export default React.memo(FormInput);
