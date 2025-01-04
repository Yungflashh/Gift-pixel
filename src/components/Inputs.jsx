// components/Input.jsx
import PropTypes from "prop-types";

const Input = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  styleClass,
  icon,
  maxLength,
}) => {
  return (
    <div className={`input-group ${styleClass}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="icon">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength= {maxLength}
          
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  styleClass: PropTypes.string,
  icon: PropTypes.element,
  maxLength : PropTypes.number
  
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  styleClass: "",
  
};

export default Input;
