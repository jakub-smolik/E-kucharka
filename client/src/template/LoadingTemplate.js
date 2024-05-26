function LoadingTemplate() {
    return (
        <div style={loadingStyle()}><h6>Načítám data...</h6></div>
    )
}

function loadingStyle() {
    return {
        textAlign: "center",
    }
}

export default LoadingTemplate;