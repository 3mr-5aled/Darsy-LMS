type Props = {
  type?: string
  title: string
  state: string
  placeholder: string
  isTextArea?: boolean
  setState: (state: string) => void
  regex?: RegExp // Updated prop for regex pattern
  errorMessage?: string // Updated prop for error message
  required?: boolean // Updated prop for required field
}

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
  regex,
  errorMessage,
  required,
}: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setState(value)
  }

  const isValid = state.length === 0 || !regex || regex.test(state) // Check if the input is empty or the regex pattern is valid

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="" className="label">
        <span className="label-text text-gray-600">{title}</span>
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required={required} // Updated to set the required attribute based on the prop
          className={`input input-bordered w-full max-w-xs ${
            isValid ? "" : "input-error"
          }`}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required={required} // Updated to set the required attribute based on the prop
          className={`input input-bordered w-full max-w-xs ${
            isValid ? "" : "input-error"
          }`}
          onChange={handleChange}
        />
      )}
      {!isValid &&
        state.length > 0 && ( // Only display the error message if the input is not empty
          <p className="text-xs text-error">
            {errorMessage || "Invalid input"}
          </p>
        )}
    </div>
  )
}

export default FormField
