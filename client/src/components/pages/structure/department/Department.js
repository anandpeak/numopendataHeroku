import React from 'react';

import DepartmentList from './DepartmentList';
import DegreePieChart from './charts/DegreePieChart';
import GradePieChart from './charts/GradePieChart.js';
import GroupedBarChart from './charts/GroupedBarChart.js';
import DepartInfo from './DepartInfo.js';
import './Departments.css';

class Department extends React.Component {
  state = {
    departs: [],
    initDep: '',
    mainName: '',
    numberOfDegree: [],
    numberOfEmp: 0,
    schoolName: '',
    numberOfGrade: [],
    totalGrade: 0,
    schoolTotalGrades: {},
    isSeas: false,
  };

  async componentDidMount() {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.depId === '284760cdf041d1f3426e342b3ab38388'
    ) {
      await this.setState({ isSeas: true });

      try {
        await fetch('https://numopendata.herokuapp.com/api/seasData', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log('seasdata= ', res);
          });
      } catch (e) {
        console.log(e);
      }
    }

    this.fetchSchools();
    if (this.props.location.state !== undefined) {
      this.setState({ schoolName: this.props.location.state.schoolName });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.departStat();
    }
  }

  fetchSchools = async () => {
    const jsonReq = {};
    if (this.props.location.state !== undefined) {
      jsonReq.id = this.props.location.state.depId;

      try {
        await fetch('https://numopendata.herokuapp.com/struct/departments', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(jsonReq),
        })
          .then((res) => {
            return res.json();
          })
          .then((departs) => {
            this.setState({
              departs: departs.results,
              initDep: departs.results[0].department_id,
              mainName: departs.results[0].department_name,
              schoolTotalGrades: departs.schoolTotalGrades,
            });
          })
          .then(() => this.departStat());
      } catch (e) {
        console.log(e);
      }
    } else {
      return this.props.history.push('/struct');
    }
  };

  departStat = async () => {
    let depId = this.state.initDep;
    console.log('departState');
    if (this.props.match.params.id) {
      depId = this.props.match.params.id;

      this.setState({ isSeas: false });
    } else {
      depId = this.state.initDep;
    }

    try {
      await fetch(
        `https://numopendata.herokuapp.com/struct/departments/${depId}`
      )
        .then((data) => data.json())
        .then((data) =>
          this.setState({
            mainName: data.depName,
            numberOfDegree: data.numberOfDegree,
            numberOfEmp: data.numberOfEmp,
            numberOfGrade: data.numberOfGrade,
            totalGrade: data.totalGrade,
          }).then((data) => {
            console.log('arar', data);
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  renderDeps() {
    const { departs } = this.state;
    const result = [];

    if (departs && departs.length > 0) {
      departs.forEach((dep) => {
        result.push(
          <DepartmentList
            key={dep.department_id}
            depId={dep.department_id}
            depName={dep.department_name}
          />
        );
      });
    }

    return result;
  }

  renderDegreeChart() {
    if (this.state.numberOfDegree.length > 0) {
      const degreeStat = [
        { education: 'Магистр', count: 0 },
        { education: 'Доктор', count: 0 },
      ];

      this.state.numberOfDegree.forEach((deg) => {
        const degEdu = deg.education;

        if (degEdu.substr(0, degEdu.indexOf(' ')) === 'Магистр') {
          degreeStat[0].count += parseInt(deg.count);
        } else if (degEdu.substr(0, degEdu.indexOf(' ')) === 'Доктор') {
          degreeStat[1].count += parseInt(deg.count);
        } else {
          degreeStat[0].count += parseInt(deg.count);
        }
      });

      return (
        <DegreePieChart className="degreeChart" numberOfDegree={degreeStat} />
      );
    }
    return null;
  }

  renderGradeChart() {
    if (this.state.numberOfGrade.length > 0) {
      return <GradePieChart numberOfGrade={this.state.numberOfGrade} />;
    }
  }

  renderGBarChart() {
    if (this.state.numberOfGrade.length > 0) {
      return (
        <GroupedBarChart
          numberOfGrade={this.state.numberOfGrade}
          schoolGrades={this.state.schoolTotalGrades}
        />
      );
    }
  }

  renderSeasInfo() {
    return <DepartInfo />;
  }

  render() {
    const { isSeas } = this.state;

    return (
      <React.Fragment>
        <div className="wrapperDepartment">
          <div className="sidenav">{this.renderDeps()}</div>
          <div className="departmentInfo">
            <p className="schoolNameTitle">{this.state.schoolName}</p>
            {!isSeas ? (
              <p className="departNameTitle">
                {this.state.mainName}ийн 2018 оны намрын улирлын мэдээллүүд
              </p>
            ) : (
              <p className="departNameTitle">
                2018 оны намрын улирлын үзүүлэлтүүд
              </p>
            )}
            {!isSeas ? (
              <p>Тэнхим нь {this.state.numberOfEmp} багш, ажилтантай</p>
            ) : null}

            {!isSeas ? this.renderDegreeChart() : null}
            {!isSeas ? this.renderGradeChart() : null}
            {!isSeas ? this.renderGBarChart() : this.renderSeasInfo()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Department;
