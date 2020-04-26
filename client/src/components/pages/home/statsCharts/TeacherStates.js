import React from 'react';

class TeacherTotalDegrees extends React.Component {
  constructor() {
    super();
    this.state = { ctx: {} };
  }

  componentDidMount() {
    const canvas = this.refs.canvas1;
    this.setState({
      ctx: canvas.getContext('2d'),
    });
  }

  renderLecDegrees = () => {
    var Chart = require('chart.js');

    var barChartData = {
      labels: ['Үндсэн багш', 'Цагын багш', 'Бусад багш ажилтнууд'],
      datasets: [
        {
          data: [731, 140, 713],
          backgroundColor: ['#1dd1a1', '#48dbfb', '#ff6b6b'],
          label: 'Хичээлийн байр 3А',
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'doughnut',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'Нийт багш, ажилтнууд 2020 оны хаврын улирал',
          fontSize: 25,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: {
          position: 'top',
        },
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLecDegrees()}

        <div style={{ width: '50%', paddingTop: '100px' }}>
          <canvas ref="canvas1"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherTotalDegrees;
