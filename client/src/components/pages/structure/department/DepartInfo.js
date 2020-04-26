import React from 'react';

class DepartInfo extends React.Component {
  constructor() {
    super();
    this.state = { isSeas: true, ctx: {} };
  }

  componentDidMount() {
    const canvas = this.refs.canvas1;
    this.setState({ ctx: canvas.getContext('2d') });
  }

  renderSeasInfo = () => {
    var Chart = require('chart.js');

    var barChartData = {
      labels: [
        'Мэдээлэл, компьютерийн ухааны тэнхим',
        'Хими, биологийн инженерчлэлийн тэнхим',
        'Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим',
        'Электроник, холбооны тэнхим',
        'Хэрэглээний математекийн тэнхим',
      ],
      datasets: [
        {
          label: 'Хичээлийн байр 3А',
          backgroundColor: '#ff6b6b',
          data: [205, 103, 67, 177, 165],
        },
        {
          label: 'Хичээлийн байр 2',
          backgroundColor: '#ff9f43',
          data: [6, 0, 3, 0, 20],
        },
        {
          label: 'Хичээлийн байр 4',
          backgroundColor: '#1dd1a1',
          data: [36, 13, 11, 9, 27],
        },
        {
          label: 'Хичээлийн байр 5',
          backgroundColor: '#0abde3',
          data: [16, 17, 9, 10, 26],
        },
        {
          label: 'E-Номын сан',
          backgroundColor: '#576574',
          data: [1, 24, 30, 15, 8],
        },
        {
          label: 'Хичээлийн төв байр',
          backgroundColor: '#ff9ff3',
          data: [18, 10, 0, 45, 16],
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'Тэнхим тус бүрийн хичээл орж буй байраар',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }],
        },
      },
    });
  };
  renderStudents = () => {
    var Chart = require('chart.js');

    var barChartData = {
      labels: [
        'Мэдээлэл, компьютерийн ухааны тэнхим',
        'Хими, биологийн инженерчлэлийн тэнхим',
        'Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим',
        'Электроник, холбооны тэнхим',
        'Хэрэглээний математекийн тэнхим',
      ],
      datasets: [
        {
          label: 'Бакалавр',
          backgroundColor: '#ff6b6b',
          data: [572, 255, 141, 463, 327],
        },

        {
          label: 'Магистр',
          backgroundColor: '#ff9f43',
          data: [18, 20, 12, 7, 17],
        },
        {
          label: 'Доктор',
          backgroundColor: '#1dd1a1',
          data: [6, 3, 5, 1, 2],
        },
      ],
    };
    if (document.getElementById('canvasStudents')) {
      var ctx = document.getElementById('canvasStudents').getContext('2d');
      window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          title: {
            display: true,
            text:
              'Тэнхим тус бүрийн "Идэвхтэй сурч байгаа" төлөвт байгаа 2018оны намрын улирлын оюутнуудын тоо',
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          responsive: true,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
          },
        },
      });
    }
  };

  renderTeacherDegrees = () => {
    var Chart = require('chart.js');

    var barChartData = {
      labels: [
        'Мэдээлэл, компьютерийн ухааны тэнхим',
        'Хими, биологийн инженерчлэлийн тэнхим',
        'Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим',
        'Электроник, холбооны тэнхим',
        'Хэрэглээний математекийн тэнхим',
      ],
      datasets: [
        {
          label: 'Доктор',
          backgroundColor: '#ff6b6b',
          data: [20, 22, 13, 15, 18],
        },

        {
          label: 'Магистр',
          backgroundColor: '#ff9f43',
          data: [28, 7, 10, 18, 9],
        },
      ],
    };
    if (document.getElementById('canvasTeacher')) {
      var ctx = document.getElementById('canvasTeacher').getContext('2d');
      window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          title: {
            display: true,
            text:
              'Тэнхим тус бүрт харьяаглагдах багш нарын зэрэг (2018 оны намрын улирлын мэдээлэл)',
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          responsive: true,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }],
          },
        },
      });
    }
  };

  renderGradStats() {
    var Chart = require('chart.js');

    var barChartData = {
      labels: ['Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль'],
      datasets: [
        {
          label: 'Мэдээлэл, компьютерийн ухааны тэнхим төгсөлт 2018',
          backgroundColor: ['#ff6b6b'],
          data: [100],
        },
        {
          label: 'Хими, биологийн инженерчлэлийн тэнхим төгсөлт 2018',
          backgroundColor: ['#0abde3'],
          data: [62],
        },
        {
          label: 'Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим төгсөлт 2018',
          backgroundColor: ['#ff9ff3'],
          data: [49],
        },
        {
          label: 'Электроник, холбооны тэнхим төгсөлт 2018',
          backgroundColor: ['brown'],
          data: [84],
        },
        {
          label: 'Хэрэглээний математекийн тэнхим төгсөлт 2018',
          backgroundColor: ['orange'],
          data: [75],
        },
      ],
    };
    if (document.getElementById('canvasGrad')) {
      var ctx = document.getElementById('canvasGrad').getContext('2d');
      window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          title: {
            display: true,
            text:
              'Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургуулийн 2018-2019оны төгсөгчдийн мэдээлэл',
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          responsive: true,
          scales: {
            // xAxes: [{ stacked: true }],
            // yAxes: [{ stacked: true }],
          },
        },
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTeacherDegrees()}
        {this.renderStudents()}
        {this.renderSeasInfo()}
        {this.renderGradStats()}

        <div style={{ width: '75%' }}>
          <canvas id="canvasTeacher"></canvas>
        </div>
        <div style={{ width: '75%' }}>
          <canvas id="canvasStudents"></canvas>
        </div>
        <div style={{ width: '75%' }}>
          <canvas ref="canvas1"></canvas>
        </div>
        <div style={{ width: '75%' }}>
          <canvas id="canvasGrad"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default DepartInfo;
