import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import dataUtilis from './utilis';
import LessonList from './LessonList';
import './MainSelection.css';
import LessonStat from './LessonStat';
import LessonsGroupedBarChart from './LessonsGroupedBarChart';

class MainSelection extends React.Component {
  state = {
    data: dataUtilis,
    lessons: [],
    selectedLesson: '',
    lessonGrade: [],
    schoolGrades: {},
    departmentGrades: [],
    season: 'autumn',
    selectedDepartment: '',
  };

  componentDidMount() {}

  async fetchData(node) {
    if (node.id === '1') {
      return null;
    }

    const jsonReq = {};

    if (node.name === undefined) {
      jsonReq.name = node;
    } else {
      this.setState({ selectedDepartment: node.name });
      jsonReq.name = node.name;
    }

    jsonReq.season = this.state.season;

    try {
      await fetch('http://localhost:8080/lesson', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(jsonReq),
      })
        .then((res) => {
          return res.json();
        })
        .then((lessons) => {
          this.setState({
            lessons,
          });
        });

      await fetch('http://localhost:8080/lessonsAverageStats', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(jsonReq),
      })
        .then((res) => {
          return res.json();
        })
        .then((totals) => {
          this.setState({
            schoolGrades: totals.totalGrades,
            departmentGrades: totals.totalDepartmentGrades,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }

  renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      onClick={() => this.fetchData(nodes)}
      nodeId={nodes.id}
      label={nodes.name}
      className="treeItem"
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => this.renderTree(node))
        : null}
    </TreeItem>
  );

  getLessonName = async (lesson) => {
    if (lesson.props === undefined) {
      await this.setState({ selectedLesson: lesson });
    } else {
      await this.setState({ selectedLesson: lesson.props.lessonName });
    }

    const jsonReq = {};

    if (this.state.selectedLesson !== '') {
      jsonReq.lessonName = this.state.selectedLesson;
      jsonReq.season = this.state.season;

      try {
        await fetch('http://localhost:8080/lessonName', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(jsonReq),
        })
          .then((res) => {
            return res.json();
          })
          .then((lessonGrade) => {
            this.setState({
              lessonGrade,
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  renderLessonList = () => {
    const { lessons } = this.state;
    const result = [];

    if (lessons && lessons.length > 0) {
      lessons.forEach((les) => {
        result.push(
          <LessonList
            key={les.lesson_name}
            getless={this.getLessonName}
            lessonName={les.lesson_name}
          />
        );
      });
    }

    return result;
  };

  renderGroupedBarChart() {
    const { departmentGrades, schoolGrades, lessonGrade } = this.state;

    if (this.state.departmentGrades.length > 0 && lessonGrade.length > 0) {
      return (
        <LessonsGroupedBarChart
          departmentGrades={departmentGrades}
          schoolGrades={schoolGrades}
          lessonGrade={lessonGrade}
        />
      );
    }
  }

  async setSeason(event) {
    await this.setState({ season: event.target.value });
    await this.fetchData(this.state.selectedDepartment);

    if (this.state.selectedLesson !== '') {
      await this.getLessonName(this.state.selectedLesson);
    }
  }

  renderSeasonSelectionBttn() {
    if (this.state.lessons.length > 0) {
      return (
        <div className="renderSeason" onChange={(seas) => this.setSeason(seas)}>
          {/* <div className="containerInput">
            <input
              className="inpRad"
              type="radio"
              value="autumn"
              name="season"
              defaultChecked="checked"
            ></input>
            <label>2018оны намрын улирал</label>
          </div>
          <div className="containerInput">
            <input
              className="inpRad"
              type="radio"
              value="spring"
              name="season"
            ></input>
            <label>2018оны хаврын улирал</label>
          </div> */}
          <FormControl component="fieldset" name="method-of-payment">
            <RadioGroup
              style={{ display: 'flex', flexDirection: 'row' }}
              onChange={(seas) => this.setSeason(seas)}
              value={this.state.season}
            >
              <FormControlLabel
                value="autumn"
                control={<Radio />}
                label="2018оны намрын улирал"
              />
              <FormControlLabel
                value="spring"
                control={<Radio />}
                label="2018оны хаврын улирал"
              />
            </RadioGroup>
          </FormControl>
        </div>
      );
    } else {
      return null;
    }
  }

  renderCharBar() {
    if (this.state.lessons.length > 0) {
      return (
        <LessonStat
          gradeStat={this.state.lessonGrade}
          lessonName={this.state.selectedLesson}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              Хичээлийн мэдээллийг харахын тулд сургууль болон тэнхим ээ сонгох
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Жагсаалтан дарж доор гарах хичээлүүдээс сонгон мэдээллүүдийг
                харна уу
              </h5>
              <TreeView
                style={{ maxWidth: 900 }}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultEndIcon={
                  <AccountBalanceIcon style={{ color: '#17a2b8' }} />
                }
                defaultExpandIcon={
                  <AccountBalanceIcon style={{ color: '#007bff' }} />
                }
                defaultExpanded={['1']}
              >
                {this.renderTree(this.state.data)}
              </TreeView>
            </div>
          </div>
          <br></br>
          <div>{this.renderSeasonSelectionBttn()}</div>
          {this.state.lessons.length > 0 && (
            <h4 style={{ paddingBottom: 10, paddingLeft: 30 }}>
              Дүнгийн мэдээлэл харах хичээллээ сонгоно уу
            </h4>
          )}
          <div className="list-group">{this.renderLessonList()}</div>
          <div className="statDiv">{this.renderCharBar()}</div>
          <div className="gBarChart">{this.renderGroupedBarChart()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainSelection;
