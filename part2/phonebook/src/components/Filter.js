const Filter = (props) => (
  <div>
    filter: <input value={props.filter} onChange={props.eventHandler} />
  </div>
)

export default Filter
