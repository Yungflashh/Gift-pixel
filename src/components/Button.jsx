// components/Button.jsx

import PropTypes from "prop-types";

const Button = ({ label, onClick, type, styleClass, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button ${styleClass}`}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  styleClass: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
};

Button.defaultParameters = {
  onClick: () => {},
  type: "button",
  styleClass: "",
  disabled: false,
};

export default Button;
