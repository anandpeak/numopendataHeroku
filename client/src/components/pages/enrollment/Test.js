import React from 'react';
import zingchart from 'zingchart';

import './Enrollment.css';
import schoolsData from '../lessons/utilis';

class Enrollment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolId: '',
      schoolName: '',
    };
  }

  componentDidMount() {
    var data = [
      {
        id: 'NUM',
        name: 'Монгол Улсын Их Сургууль',
        parent: '',
        cls: 'bdegblue',
      },

      {
        id: 'Structure',
        name: 'Бүтэц',
        parent: 'NUM',
        cls: 'byellow',
        value: 'aaaanaa',
      },

      {
        id: '284760cdf041d1f3426e342b3ab38388',
        name: 'Хэрэглээний<br> шинжлэх ухаан,<br>  инженерчлэлийн <br>сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: 'schoolOfScience',
        name: 'Шинжлэх ухааны<br> сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: 'c62cb66de6319c5cfb8564bd31663518',
        name: 'Байгалийн ухааны <br>салбар',
        parent: 'schoolOfScience',
        reference: 'schoolOfScience',
        cls: 'bblue',
      },
      {
        id: '015480ea0376995bc4ecfc6ed64b626c',
        name: 'Нийгмийн ухааны<br>салбар',
        parent: 'schoolOfScience',
        reference: 'schoolOfScience',
        cls: 'bblue',
      },
      {
        id: '2b3ffbb838825f2ff2be095f27d3800c',
        name: 'Хүмүүнлэгийн ухааны <br>салбар',
        parent: 'schoolOfScience',
        reference: 'schoolOfScience',
        cls: 'bblue',
      },
      {
        id: '0285af2149c0e7f2088cae2030445449',
        name: 'Хууль зүйн<br>сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: '286c0b8b942ee72e4605ad32c12ef724',
        name: 'Олон улсын <br>харилцаа, нийтийн<br> удирдлагын сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: '9712ef6cda57e586c80ecc965fa557dd',
        name: 'Завхан сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: '74d1b9d30c106b19aa5a49e0b25cf594',
        name: 'Эрдэнэт сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
      {
        id: '654e50b9351b4855a96d3a57e5e0d7ae',
        name: 'Бизнесийн сургууль',
        parent: 'Structure',
        cls: 'bgreen',
      },
    ];

    var cdata = {
      type: 'tree',
      plotarea: {
        margin: 20,
      },
      options: {
        aspect: 'tree-down',
        orgChart: true,
        packingFactor: 1,
        link: {
          lineColor: '#000',
          lineWidth: 2,
        },
        node: {
          borderColor: '#000',
          borderWidth: 2,
          hoverState: {
            visible: false,
          },
          fillAngle: 0,
          gradientStops: '0.01 0.5 0.55 0.99',
          shadow: true,
          shadowDistance: 4,
          shadowColor: '#ccc',
          label: {
            color: '#000',
            fontSize: 10,
          },
        },
        'link[parent-prmdir]': {
          aspect: 'side-before',
        },
        'link[parent-fed]': {
          aspect: 'side-before',
        },
        'link[parent-sdirsp]': {
          aspect: 'side-before',
        },
        'node[cls-byellow]': {
          type: 'box',
          width: 200,
          height: 60,
          gradientColors: '#FDDA58 #FBF4BD #FBF4BD #FDDA58',
          label: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        'node[cls-bred]': {
          type: 'box',
          width: 160,
          height: 150,
          gradientColors: '#A15A58 #D6B2B2 #D6B2B2 #A15A58',
          label: { fontSize: 12, fontWeight: 'bold' },
        },
        'node[cls-bdegblue]': {
          type: 'box',
          width: 300,
          height: 70,
          gradientColors: '#51B7CD #C0E0EB #C0E0EB #51B7CD',
          label: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        'node[cls-bblue]': {
          type: 'box',
          width: 160,
          height: 90,
          backgroundColor: '#B7DDE8',
          label: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        'node[cls-bgreen]': {
          type: 'box',
          width: 180,
          height: 120,
          backgroundColor: '#C3D79A',
          label: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        },
        'node[cls-bwhite]': {
          type: 'box',
          width: 140,
          height: 50,
          backgroundColor: '#fff',
          offsetX: 30,
        },
      },
      series: data,
    };

    zingchart.bind('zc', 'shape_click', (e) => {
      const schoolId = e.shapeid.slice(-32);

      const schoolValues = schoolsData.children.filter((school) => {
        return school.id === schoolId;
      });

      if (schoolValues.length > 0) {
        this.props.history.push({
          pathname: '/struct/departments',
          state: {
            depId: schoolValues[0].id,
            schoolName: schoolValues[0].name,
          },
        });
        window.location.reload();
      }

      //   console.log(schoolValues);
    });

    zingchart.render({
      id: 'zc',
      width: 1600,
      height: 850,
      output: 'svg',
      data: cdata,
    });
  }

  render() {
    return (
      <div className="enrollmentContainer">
        <div id="zc"></div>
      </div>
    );
  }
}

export default Enrollment;
