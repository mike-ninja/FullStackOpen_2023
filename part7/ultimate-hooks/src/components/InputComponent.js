const InputComponent = ({ type, value, reset, onChange }) => {
  const inputProps = { type, value, onChange }

  return <input {...inputProps} />
}

export default InputComponent
