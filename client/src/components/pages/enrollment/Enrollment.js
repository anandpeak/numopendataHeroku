import React from 'react';

import MaleStat from './stats/MaleStat.js';
import TotalEnrollments from './stats/TotalEnrollments.js';
import FemaleStat from './stats/FemaleStat';
import AvgStat from './stats/AvgStat';
import './Enrollment.css';

class LessonType extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row enrollment">
            <TotalEnrollments />
            <AvgStat />
            <MaleStat />
            <FemaleStat />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LessonType;
