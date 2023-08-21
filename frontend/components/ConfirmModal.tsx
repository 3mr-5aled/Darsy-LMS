interface ConfirmModalProps {
  title: string
  children: React.ReactNode
  handleClick: () => void
  handleClose: () => void // Add a prop for closing the modal
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  children,
  handleClick,
  handleClose, // Receive the prop for closing the modal
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-base-100 rounded-lg p-5">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="mb-5">{children}</div>
        <div className="flex gap-3 justify-end">
          <button className="btn btn-primary" onClick={handleClick}>
            Confirm
          </button>
          <button
            className="btn btn-error"
            onClick={handleClose} // Call the function to close the modal
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
