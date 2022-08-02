const Notification = ({message, error}) => {
    const isError = error ? "error": 'notice'
    
    if (message === null){
        return null
    }


    return (
        <div className={isError}>
            {message}
        </div>
    )
}

export default Notification