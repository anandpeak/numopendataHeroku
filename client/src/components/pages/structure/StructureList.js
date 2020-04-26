import React from 'react';

import './StructureList.css';
import { Link } from 'react-router-dom';

class StructureList extends React.Component {
  render() {
    return (
      <div className="col col-sm  col-md-6 col-lg-4">
        <Link
          to={{
            pathname: '/struct/departments',
            state: {
              depId: this.props.school.schoolId,
              schoolName: this.props.school.schoolName
            }
          }}
        >
          <div className="structList">
            <h4 className="mainContext">{this.props.school.schoolName}</h4>
            <p className="more">Дэлгэрэнгүй >></p>
          </div>
        </Link>
      </div>
    );
  }
}

export default StructureList;
