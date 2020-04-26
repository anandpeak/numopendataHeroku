import React from 'react';

class LessonType extends React.Component {
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
        'Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль',
        'Бизнесийн сургууль',
        'Хууль зүйн сургууль',
        'Шинжлэх ухааны сургууль',
        'Олон улсын харилцаа, нийтийн удирдлагын сургууль',
      ],
      datasets: [
        {
          data: [479, 339, 368, 1186, 70],
          backgroundColor: '#1289A7',
          label: 'Лекц',
        },
        {
          data: [440, 536, 338, 2348, 101],
          backgroundColor: '#D980FA',
          label: 'Семинар',
        },
        {
          data: [228, 0, 0, 111, 0],
          backgroundColor: '#B53471',
          label: 'Лаборатори',
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'Хичээл орж буй хэлбэр ',
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

export default LessonType;
