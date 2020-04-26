import React from 'react';

import './Structure.css';
import StructureList from './StructureList';

class Structure extends React.Component {
  state = {
    schools: [
      {
        schoolName: 'Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль',
        schoolId: '284760cdf041d1f3426e342b3ab38388',
      },
      {
        schoolName: 'Хүмүүнлэгийн ухааны салбар',
        schoolId: '2b3ffbb838825f2ff2be095f27d3800c',
      },
      {
        schoolName: 'Бизнесийн сургууль',
        schoolId: '654e50b9351b4855a96d3a57e5e0d7ae',
      },
      {
        schoolId: 'c62cb66de6319c5cfb8564bd31663518',
        schoolName: 'Байгалийн ухааны салбар',
      },
      {
        schoolId: '015480ea0376995bc4ecfc6ed64b626c',
        schoolName: 'Нийгмийн ухааны салбар',
      },
      {
        schoolName: 'Хууль зүйн сургууль',
        schoolId: '0285af2149c0e7f2088cae2030445449',
      },
      {
        schoolName: 'Олон улсын харилцаа, нийтийн удирдлагын сургууль',
        schoolId: '286c0b8b942ee72e4605ad32c12ef724',
      },
      {
        schoolName: 'Завхан сургууль',
        schoolId: '9712ef6cda57e586c80ecc965fa557dd',
      },
      {
        schoolId: '74d1b9d30c106b19aa5a49e0b25cf594',
        schoolName: 'Эрдэнэт сургууль',
      },
    ],
  };

  schoolList = () => {
    const result = this.state.schools.map((school) => (
      <StructureList school={school} key={school.schoolId} />
    ));

    return result;
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">{this.schoolList()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Structure;
