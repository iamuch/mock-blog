export default function Button(props) {
    return (
        <button onClick={props.onClick} className="btn" style={{width: props.width}}>
            {props.label}
        </button>
    )
}