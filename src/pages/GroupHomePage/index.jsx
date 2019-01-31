import React from "react";
import MainNavBar from "../../components/MainNavBar";
import ActionBar from "../HomePage/components/ActionBar";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};
class GroupHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {}
    };
  }

  componentDidMount() {
    const { location } = this.props.history;
    const { state } = location;
    if (state) {
      this.setState({
        group: state.group
      });
    }
  }

  render() {
    const { group } = this.state;
    return (
      <div style={styles.container}>
        <MainNavBar inGroup={true} groupName={group.groupName} />
        <ActionBar />
      </div>
    );
  }
}

export default GroupHomePage;
