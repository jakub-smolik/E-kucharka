function ErrorTemplate(props) {
    return (
        <div style={errorStyle()}>
            <h6>Data se nepodařilo načíst</h6>
            <p>{ props.errorMessage }</p>
        </div>
    )
}

function errorStyle() {
    return {
        margin: "0 10%",
        border: "2px solid red",
        backgroundColor: "pink",
        textAlign: "center",
        borderRadius: "5px"
    }
}

export default ErrorTemplate;