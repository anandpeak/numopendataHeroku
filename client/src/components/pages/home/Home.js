import React from 'react';
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBookReader,
  FaSchool,
} from 'react-icons/fa';

import './Home.css';
import TeacherTotalDegrees from './statsCharts/TeacherTotalDegrees';
import TeacherStates from './statsCharts/TeacherStates';
import StudentsDegree from './statsCharts/StudentsDegree';
import LessonType from './statsCharts/LessonType';
import SchoolAvgGrade from './statsCharts/SchoolAvgGrade';
import SchoolAvgGradeSpring from './statsCharts/SchoolAvgGradeSpring';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          {/* <p className="sectionheader col-md-12 ">Монгол Улсын Их Сургууль</p> */}
          <div className="container mobile-container tablet-container">
            <div className="text-feature" style={{ textAlign: 'center' }}>
              <span className="span1">
                Нээлттэй өгөгдөлд зориулсан статистик үнэлгээний систем.
                <br></br>
                <a href="http://data.num.edu.mn/">http://data.num.edu.mn/</a>
                сайтын нээлттэй өгөгдөлийг ашигласан болно.
              </span>
              <div
                className="row tablet-row mobile-row"
                style={{ paddingBottom: '50px' }}
              >
                <span className="span2">
                  МУИС нь 2018 оноос өөрсдийн нээлттэй өгөгдлийг хөгжүүлэх ажлыг
                  санаачлан хэрэгжүүлж эхэлсэн. Монгол Улсад анх удаа дээд
                  боловсролын байгууллага өөрсдийн үйл ажиллагааны талаарх
                  өгөгдлийг нээж харуулсан сайн жишээ, түүчээ болсон ба МУИС ийн
                  нээлттэй өгөгдөлийг ашиглан энэхүү сайтыг бүтээлээ. Нээлттэй
                  өгөгдөл гэж “хэн ч чөлөөтэй ашиглаж, өөр зорилгоор хэрэглэж,
                  дахин түгээж болдог, ихэвчлэн зохиогчийг заавал дурдах, ижил
                  нөхцөлөөр дамжуулах лицензтэй цахим өгөгдөл” хэлдэг.
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3 infoText">
            <FaChalkboardTeacher className="icons" />
            <h1 className="counter">1584</h1>
            <h4 className="counterName">Багш, ажилтантай</h4>
            <p className="ptext">
              Нэг багшид дунджаар 13.5 оюутан оногдож байна.
            </p>
          </div>
          <div className="col-md-3 infoText">
            <FaUserGraduate className="icons" />
            <h1 className="counter">21393</h1>
            <h4 className="counterName">Оюутантай</h4>
            <p className="ptext">
              Бакалавр оюутан: 16608, Магистрант оюутан: 3308, Докторант оюутан:
              972, Хэлний бэлтгэл: 95, Гадаад оюутан: 410
            </p>
          </div>
          <div className="col-md-3 infoText">
            <FaBookReader className="icons" />
            <div className="cIcon"></div>
            <h1 className="counter">5920</h1>
            <h4 className="counterName">
              Лекц, семинар болон Лабораторийн хичээл орсон
            </h4>
            <p className="ptext">
              2018оны байдлаар нийт 31 лекцийн заал, 146 анги, 112 лаборатор,
              143 багш нарын өрөө, 68 хичээлийн тэнхим бүртгэлтэй байна
            </p>
          </div>
          <div className="col-md-3 infoText">
            <FaSchool className="icons" />
            <div className="cIcon"></div>
            <h1 className="counter">5</h1>
            <h4 className="counterName">Бүрэлдэхүүн сургууль</h4>
            <p className="ptext">
              МУИС нь түүхэн хөгжлийнхөө явцад одоогийн МУБИС, ХААИС, ЭМШУИС,
              ШУТИС, ХИС, Ховд их сургууль гэсэн 6 их сургуулийг өрх тусгаарлан
              шинээр байгуулсан байна.
            </p>
          </div>
        </div>
        <div className="row">
          <TeacherTotalDegrees />
          <TeacherStates />
          <StudentsDegree />
          <LessonType />
          <SchoolAvgGrade />
          <SchoolAvgGradeSpring />
        </div>
      </div>
    );
  }
}

export default Home;
