import "./Popup.scss";

interface PopupProps {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function Popup(props: PopupProps) {
  const handleCloseButton = () => {
    return props.setIsValid(true);
  };

  return (
    <div className="popup">
      <div className="messageContainer">
        <button className="closePopup" onClick={handleCloseButton}>
          x
        </button>
        <h3>please, fill the form</h3>
      </div>
    </div>
  );
}

export default Popup;
