import React from 'react';

class SchoolAvgGradeSpring extends React.Component {
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
        'W үнэлгээ',
        'F үнэлгээ',
        'D- үнэлгээ',
        'D үнэлгээ',
        'C- үнэлгээ',
        'C үнэлгээ',
        'B- үнэлгээ',
        'B үнэлгээ',
        'A- үнэлгээ',
        'A үнэлгээ',
      ],
      datasets: [
        {
          data: [3553, 5781, 3617, 2184, 4853, 4622, 10869, 9732, 14744, 12020],
          backgroundColor: '#1289A7',
          label: 'Үнэлгээ',
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text:
            '2018 оны Хаврын улиралд нийт оюутануудыг үнэлсэн үнэлгээ, тоогоор. ',
          fontSize: 30,
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

        <div style={{ width: '90%', paddingTop: '100px' }}>
          <canvas ref="canvas1"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default SchoolAvgGradeSpring;
