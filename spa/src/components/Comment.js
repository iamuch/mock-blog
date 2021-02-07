import moment from 'moment';

export default function Comment(props) {
    return (
        <div className="flex flex-column mb-50 px-40 py-60 col-12 bg-gray">
            <span className="f-18 ff-2 mb-21">{props.comment.content}</span>
            <span className="f-16 fw-bold">{moment(props.comment.createdAt).fromNow()}</span>
        </div>
    )
}