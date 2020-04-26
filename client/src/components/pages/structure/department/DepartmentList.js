import React from 'react';
import { Link } from 'react-router-dom';

class DepartmentList extends React.Component {
  render() {
    const isSeas = { seas: 'no' };

    return (
      <React.Fragment>
        <Link to={`/struct/departments/${this.props.depId}/`} className="link">
          {this.props.depName}
        </Link>
      </React.Fragment>
    );
  }
}

export default DepartmentList;
