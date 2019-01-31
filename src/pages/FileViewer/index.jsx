import React from "react";
import FileViewerr from "react-file-viewer";

class FileViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: ""
    };
  }
  componentDidMount() {
    const { location } = this.props.history;
    if (location.state) {
      const { url } = location.state;
      this.setState({
        fileUrl: url
      });
    } else {
      this.props.history.push("/");
    }
  }
  render() {
    const { fileUrl } = this.state;
    return (
      <div>{fileUrl && <FileViewerr fileType="docx" filePath={fileUrl} />}</div>
    );
  }
}

export default FileViewer;
