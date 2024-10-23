function Title(props) {
    if(props.size === "h1") {
        return (
            <h1 className="title App-title">
                {props.text}
            </h1>
        );
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 className="title">
                {props.text}
            </h2>      
        </div>
    );
}

export default Title;
