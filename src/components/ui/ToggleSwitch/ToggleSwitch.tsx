import React from 'react';

interface IToggleSwitchProps {
  onClick: () => void;
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = (props) => {
  const [toggled, setToggled] = React.useState(false);

  return (
    <button
      className="rw-temp-switch"
      type="button"
      onClick={() => {
        setToggled((checked) => !checked);
        props.onClick();
      }}
    >
      {toggled && <span className="on">C</span>}
      {!toggled && <span className="off">F</span>}
      <span className="rw-temp-slider" style={{ transform: toggled ? ' translateX(28px)' : ' translateX(0px)' }} />
    </button>
  );
};

export default ToggleSwitch;
