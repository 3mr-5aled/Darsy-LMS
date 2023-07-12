type Props = {
  title: string
  options: string[]
  setState: (state: string) => void
}

const SelectMenu = ({ title, options, setState }: Props) => {
  return (
    <select
      title={title}
      className="select select-bordered w-full max-w-xs"
      defaultValue="default"
      onChange={(e) => setState(e.target.value)}
    >
      <option disabled value="default">
        {title}
      </option>
      {options.map((option, index) => (
        <option value="option" key={index}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectMenu
