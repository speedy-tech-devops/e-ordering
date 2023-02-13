import React from "react"
import QRCode from "react-qr-code";
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="d-flex justify-content-center align-items-center" style={{height: "100vh",flexDirection: "column"}}>
            <h2 className="title-scan">Ezorder Scan Now !!!</h2>
            <div className="error-border">
              <img src="/images/scan.png"></img>
            {/* <QRCode
              size={190}
              style={{ height: "auto" }}
              value={"error"}
              viewBox={`0 0 100 100`} /> */}
            </div>
            
            {/* <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button> */}
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary