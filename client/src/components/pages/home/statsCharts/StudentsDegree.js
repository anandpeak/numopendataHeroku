import React from 'react';

class StudentsDegree extends React.Component {
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
          data: [2650, 2229, 1274, 4936, 591],
          backgroundColor: '#1289A7',
          label: 'Бакалавр',
        },
        {
          data: [74, 140, 247, 313, 63],
          backgroundColor: '#D980FA',
          label: 'Магистр',
        },
        {
          data: [17, 27, 20, 128, 19],
          backgroundColor: '#B53471',
          label: 'Доктор',
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
            ' "Идэвхтэй сурч байгаа" төлөвт суралцаж буй академик түвшиний оюутануудын тоо, тоон үзүүлэлтээр',
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

export default StudentsDegree;
