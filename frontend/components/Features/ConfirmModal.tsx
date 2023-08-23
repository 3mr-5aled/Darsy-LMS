interface ConfirmModalProps {
  title: string
  ConfirmText?: string
  children: React.ReactNode
  handleClick?: () => void // Optional
  handleClose: () => void // Add a prop for closing the modal
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  ConfirmText,
  children,
  handleClick, // Optional
  handleClose, // Receive the prop for closing the modal
}) => {
  return (
    // <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-70">
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="mb-5">{children}</div>
        <div className="modal-action">
          {handleClick && ( // Conditionally render the "Confirm" button
            <button className="btn btn-primary" onClick={handleClick}>
              {ConfirmText || "Confirm"}
            </button>
          )}
          <button
            className="btn btn-error"
            onClick={handleClose} // Call the function to close the modal
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default ConfirmModal
