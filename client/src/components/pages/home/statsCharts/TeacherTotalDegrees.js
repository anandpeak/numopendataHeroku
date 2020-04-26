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
      labels: [
        'Бүрэн дунд',
        'Доктор(Ph.D, Sc.D)',
        'Магистр',
        'Бакалавр',
        'Академич',
      ],
      datasets: [
        {
          data: [116, 595, 570, 244, 2],
          backgroundColor: [
            '#487eb0',
            '#4cd137',
            '#fbc531',
            '#9c88ff',
            '#00a8ff',
          ],
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
          text: 'Багш, ажилчидын зэрэг цолны мэдээлэл 2018 оны байдлаар ',
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
