import css from "./DeleteModalWindow.module.css";

const DeleteModalWindow = ({ handleDelete, handleClose }) => {
  return (
    <div className={css.modal}>
      <h3 className={css.text}>Are you sure you want to delete the request?</h3>
      <div className={css["button-container"]}>
        <button className={css.confirm} onClick={handleDelete}>
          Confirm
        </button>
        <button className={css.close} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteModalWindow;
