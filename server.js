const { Client } = require('pg');
const express = require('express');
var cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  user: 'postgres',
  password: 'Eff123456',
  host: 'localhost',
  port: 5432,
  database: 'numdata',
});

app.post('/struct/departments', async (req, res) => {
  let rows = [];
  try {
    const reqJson = req.body;
    rows = await getStruct(reqJson.id);
  } catch (e) {
    console.log(e);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.post('/lesson', async (req, res) => {
  let rows = [];

  try {
    const reqJson = req.body;
    rows = await getLessons(reqJson);
  } catch (e) {
    console.log(e);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.post('/lessonName', async (req, res) => {
  let rows = [];

  try {
    const reqJson = req.body;
    rows = await getLessonStat(reqJson);
  } catch (e) {
    console.log(e);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.get('/struct/departments/:id', async (req, res) => {
  var id = req.params.id;
  let rows = {};
  try {
    rows = await getDepart(id);
  } catch (err) {
    console.log(err);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.post('/lessonsAverageStats', async (req, res) => {
  let rows = {};

  try {
    const reqJson = req.body;
    rows = await getLessonsAverageStats(reqJson);
  } catch (e) {
    console.log(e);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.post('/api/seasData', async (req, res) => {
  let rows;
  const schoolId = '284760cdf041d1f3426e342b3ab38388';

  try {
    rows = await getSeasData(schoolId);
  } catch (e) {
    console.log('error in api/seasData = ', e);
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(rows);
  }
});

app.listen(port, () => console.log('web server listeninig'));

start();

async function start() {
  await connect();
}

async function connect() {
  try {
    await client.connect();
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}

//Get school Grades A->F
async function getSchoolGradesAverage(schoolName, season = 'autumn') {
  let totalGrades = {
    A: 0,
    'A-': 0,
    B: 0,
    'B-': 0,
    C: 0,
    'C-': 0,
    D: 0,
    'D-': 0,
    F: 0,
  };

  try {
    let departmentNames;
    //Get Department name list in HeadSChool

    //Get lessons name list departments
    let depsLessons = [];

    //Get lessons grade in lessons name
    let lessonGrades = [];

    //Тэнхимүүдийн нэрийг авах
    departmentNames = await client.query(
      'select department_name from num_structure where controlling_department_name = $1',
      [schoolName]
    );

    //хичээлүүдийн нэрийг авах
    if (season !== 'autumn') {
      for (let num of departmentNames.rows) {
        depsLessons.push(
          (
            await client.query(
              'select lesson_name from grade2018spring where department_name = $1 group by lesson_name',
              [num.department_name]
            )
          ).rows
        );
      }
      for (let lessons of depsLessons) {
        for (let lesson of lessons) {
          lessonGrades.push(
            (
              await client.query(
                'select grade_char, sum(grade_count) from grade2018autumn where lesson_name = $1 group by grade_char order by grade_char',
                [lesson.lesson_name]
              )
            ).rows
          );
        }
      }
    } else {
      for (let num of departmentNames.rows) {
        depsLessons.push(
          (
            await client.query(
              'select lesson_name from grade2018autumn where department_name = $1 group by lesson_name',
              [num.department_name]
            )
          ).rows
        );
      }
      for (let lessons of depsLessons) {
        for (let lesson of lessons) {
          lessonGrades.push(
            (
              await client.query(
                'select grade_char, sum(grade_count) from grade2018autumn where lesson_name = $1 group by grade_char order by grade_char',
                [lesson.lesson_name]
              )
            ).rows
          );
        }
      }
    }

    for (let grades of lessonGrades) {
      for (let grade of grades) {
        if (grade.grade_char === 'A') {
          totalGrades['A'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'A-') {
          totalGrades['A-'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'B') {
          totalGrades['B'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'B-') {
          totalGrades['B-'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'C') {
          totalGrades['C'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'C-') {
          totalGrades['C-'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'D') {
          totalGrades['D'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'D-') {
          totalGrades['D-'] += parseInt(grade.sum);
        } else if (grade.grade_char === 'F') {
          totalGrades['F'] += parseInt(grade.sum);
        }
      }
    }

    return totalGrades;
  } catch (e) {
    return [];
  }
}

//Get department name and ID, school Grades
async function getStruct(headSchoolId) {
  try {
    const results = await client.query(
      'select department_name,department_id from num_structure where controlling_department_id = $1',
      [headSchoolId]
    );

    //Get HeadSChoolName like SEAS
    const schoolName = await client.query(
      'select department_name from num_structure where department_id=$1',
      [headSchoolId]
    );

    const totalGrades = await getSchoolGradesAverage(
      schoolName.rows[0].department_name
    );

    let jsonRes = { results: results.rows, schoolTotalGrades: totalGrades };

    return await jsonRes;
  } catch (e) {
    return [];
  }
}

//Get Department Lessons
async function getLessons(depName) {
  try {
    let results;
    if (depName.season === 'spring') {
      results = await client.query(
        'select lesson_name from grade2018spring where department_name = $1 group by lesson_name order by lesson_name',
        [depName.name]
      );
    } else {
      results = await client.query(
        'select lesson_name from grade2018autumn where department_name = $1 group by lesson_name order by lesson_name',
        [depName.name]
      );
    }

    return results.rows;
  } catch (e) {
    return [];
  }
}

async function getLessonStat(lessName) {
  try {
    let results;
    if (lessName.season === 'spring') {
      results = await client.query(
        'select grade_char, sum(grade_count) from grade2018spring where lesson_name = $1 group by grade_char order by grade_char',
        [lessName.lessonName]
      );
    } else {
      results = await client.query(
        'select grade_char, sum(grade_count) from grade2018autumn where lesson_name = $1 group by grade_char order by grade_char',
        [lessName.lessonName]
      );
    }

    return results.rows;
  } catch (e) {
    return [];
  }
}

//Get Departments Stats
async function getDepart(depId) {
  try {
    const results = await client.query(
      'select count(*) from name_of_lecturer_2018autumn where structure_id = $1',
      [depId]
    );

    const depName = await client.query(
      'select department_name from num_structure where department_id = $1',
      [depId]
    );

    const numberDegree = await client.query(
      'select  education,count(*) from name_of_lecturer_2018autumn where structure_id = $1 group by education',
      [depId]
    );

    const numberOfGrade = await client.query(
      'select grade_char, sum(grade_count) from grade2018autumn where department_name = $1 group by grade_char order by grade_char',
      [depName.rows[0].department_name]
    );

    const totalGrade = await client.query(
      'select  sum(grade_count) from grade2018autumn where department_name = $1',
      [depName.rows[0].department_name]
    );

    const depStat = {
      depName: depName.rows[0].department_name,
      numberOfEmp: results.rows[0].count,
      numberOfDegree: numberDegree.rows,
      numberOfGrade: numberOfGrade.rows,
      totalGrade: totalGrade.rows[0].sum,
    };

    return depStat;
  } catch (e) {
    return [];
  }
}

//Сургуул болон тэнхимийн дундаж дүнг lessons харуулахад ашиглана.
async function getLessonsAverageStats(departmentName) {
  let totalSchoolGrades;
  let totalDepartmentGrades;

  try {
    const controlling_department = await client.query(
      'select controlling_department_name from num_structure where department_name = $1',
      [departmentName.name]
    );

    if (departmentName.season === 'spring') {
      totalSchoolGrades = await getSchoolGradesAverage(
        controlling_department.rows[0].controlling_department_name,
        departmentName.season
      );

      totalDepartmentGrades = await client.query(
        'select grade_char, sum(grade_count) from grade2018spring where department_name = $1 group by grade_char order by grade_char',
        [departmentName.name]
      );
    } else {
      totalSchoolGrades = await getSchoolGradesAverage(
        controlling_department.rows[0].controlling_department_name
      );

      totalDepartmentGrades = await client.query(
        'select grade_char, sum(grade_count) from grade2018autumn where department_name = $1 group by grade_char order by grade_char',
        [departmentName.name]
      );
    }

    let jsonRes = {
      totalGrades: totalSchoolGrades,
      totalDepartmentGrades: totalDepartmentGrades.rows,
    };

    return jsonRes;
  } catch (e) {
    return [];
  }
}

async function getSeasData(seasId) {
  // let mkut, chemical, envrmnt, math, elect;

  // math = await client.query(
  //   'select mongolian_name from lesson_info_2018_autumn where controlling_department = $1',
  //   ['Хэрэглээний математикийн тэнхим']
  // );

  // chemical = await client.query(
  //   'select mongolian_name from lesson_info_2018_autumn where controlling_department = $1',
  //   ['Хими, биологийн инженерчлэлийн тэнхим']
  // );

  // envrmnt = await client.query(
  //   'select mongolian_name from lesson_info_2018_autumn where controlling_department = $1',
  //   ['Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим']
  // );

  // mkut = await client.query(
  //   'select mongolian_name from lesson_info_2018_autumn where controlling_department = $1',
  //   ['Мэдээлэл, компьютерийн ухааны тэнхим']
  // );

  // elect = await client.query(
  //   'select mongolian_name from lesson_info_2018_autumn where controlling_department = $1',
  //   ['Электроник, холбооны инженерчлэлийн тэнхим']
  // );

  // let allSchedule = await client.query(
  //   'select lesson_name, lesson_apart from schedule2018autumn '
  // );

  // const json = {
  //   mkut: mkut.rows,
  //   chemical: chemical.rows,
  //   envrmnt: envrmnt.rows,
  //   math: math.rows,
  //   elect: elect.rows,
  //   allSchedule: allSchedule.rows,
  // };

  // let mkutSchedules = [];
  // let chemicalSchedules = [];
  // let elecSchedules = [];
  // let mathSchedules = [];
  // let envrmntSchedules = [];

  // for (const lesson of json.mkut) {
  //   const tempMkut = json.allSchedule.filter((lessonSchedule) => {
  //     return lessonSchedule.lesson_name === lesson.mongolian_name;
  //   });

  //   if (tempMkut.length > 0) {
  //     mkutSchedules.push(tempMkut);
  //   }
  // }

  // for (const lesson of json.chemical) {
  //   const tempChemical = json.allSchedule.filter((lessonSchedule) => {
  //     return lessonSchedule.lesson_name === lesson.mongolian_name;
  //   });

  //   if (tempChemical.length > 0) {
  //     chemicalSchedules.push(tempChemical);
  //   }
  // }

  // for (const lesson of json.elect) {
  //   const tempElec = json.allSchedule.filter((lessonSchedule) => {
  //     return lessonSchedule.lesson_name === lesson.mongolian_name;
  //   });

  //   if (tempElec.length > 0) {
  //     elecSchedules.push(tempElec);
  //   }
  // }

  // for (const lesson of json.math) {
  //   const tempMath = json.allSchedule.filter((lessonSchedule) => {
  //     return lessonSchedule.lesson_name === lesson.mongolian_name;
  //   });

  //   if (tempMath.length > 0) {
  //     mathSchedules.push(tempMath);
  //   }
  // }

  // for (const lesson of json.envrmnt) {
  //   const tempEnvrmnt = json.allSchedule.filter((lessonSchedule) => {
  //     return lessonSchedule.lesson_name === lesson.mongolian_name;
  //   });

  //   if (tempEnvrmnt.length > 0) {
  //     envrmntSchedules.push(tempEnvrmnt);
  //   }
  // }

  // let mkutApart = [];

  // for (const arr of mkutSchedules) {
  //   for (const item of arr) {
  //     if (mkutApart.length === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 0,
  //       };
  //       mkutApart.push(newAp);
  //     }

  //     let temp = 0;

  //     for (const part of mkutApart) {
  //       if (item.lesson_apart === part.apartName) {
  //         part.countApart++;
  //         temp++;
  //         break;
  //       }
  //     }
  //     if (temp === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 1,
  //       };
  //       mkutApart.push(newAp);
  //     }
  //   }
  // }

  // await console.log('mkut = ', mkutApart);

  // let elecApart = [];

  // for (const arr of elecSchedules) {
  //   for (const item of arr) {
  //     if (elecApart.length === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 0,
  //       };
  //       elecApart.push(newAp);
  //     }

  //     let temp = 0;

  //     for (const part of elecApart) {
  //       if (item.lesson_apart === part.apartName) {
  //         part.countApart++;
  //         temp++;
  //         break;
  //       }
  //     }
  //     if (temp === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 1,
  //       };
  //       elecApart.push(newAp);
  //     }
  //   }
  // }

  // await console.log('elec = ', elecApart);

  // let chemicalApart = [];

  // for (const arr of chemicalSchedules) {
  //   for (const item of arr) {
  //     if (chemicalApart.length === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 0,
  //       };
  //       chemicalApart.push(newAp);
  //     }

  //     let temp = 0;

  //     for (const part of chemicalApart) {
  //       if (item.lesson_apart === part.apartName) {
  //         part.countApart++;
  //         temp++;
  //         break;
  //       }
  //     }
  //     if (temp === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 1,
  //       };
  //       chemicalApart.push(newAp);
  //     }
  //   }
  // }

  // await console.log('chemical = ', chemicalApart);

  // let mathApart = [];

  // for (const arr of mathSchedules) {
  //   for (const item of arr) {
  //     if (mathApart.length === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 0,
  //       };
  //       mathApart.push(newAp);
  //     }

  //     let temp = 0;

  //     for (const part of mathApart) {
  //       if (item.lesson_apart === part.apartName) {
  //         part.countApart++;
  //         temp++;
  //         break;
  //       }
  //     }
  //     if (temp === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 1,
  //       };
  //       mathApart.push(newAp);
  //     }
  //   }
  // }

  // await console.log('math = ', mathApart);

  // let envrmntApart = [];

  // for (const arr of envrmntSchedules) {
  //   for (const item of arr) {
  //     if (envrmntApart.length === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 0,
  //       };
  //       envrmntApart.push(newAp);
  //     }

  //     let temp = 0;

  //     for (const part of envrmntApart) {
  //       if (item.lesson_apart === part.apartName) {
  //         part.countApart++;
  //         temp++;
  //         break;
  //       }
  //     }
  //     if (temp === 0) {
  //       const newAp = {
  //         apartName: item.lesson_apart,
  //         countApart: 1,
  //       };
  //       envrmntApart.push(newAp);
  //     }
  //   }
  // }

  // await console.log('envor = ', envrmntApart);

  // json.envrmnt = envrmntApart;
  // json.math = mathApart;
  // json.mkut = mkutApart;
  // json.chemical = chemicalApart;
  // json.elect = elecApart;

  //Оюутнуудын сургуувь, хөтөлбөр, ирц
  // const seasStudentsState = await client.query(
  //   'select * from student2018autumn where department_name = $1',
  //   ['Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль']
  // );

  // //тэнхим, хөтөлбөр
  // const programData = await client.query('select * from programdata2018');

  // //Тэнхим
  // const seasDepartments = await client.query(
  //   'select department_name,department_id from num_structure where controlling_department_name = $1',
  //   ['Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль']
  // );

  // let mkut = [],
  //   chem = [],
  //   envor = [],
  //   elec = [],
  //   math = [];

  // for (const program of programData.rows) {
  //   if (
  //     program.controlling_school_name === 'Мэдээлэл, компьютерийн ухааны тэнхим'
  //   ) {
  //     mkut.push(program);
  //   } else if (
  //     program.controlling_school_name ===
  //     'Хими, биологийн инженерчлэлийн тэнхим'
  //   ) {
  //     chem.push(program);
  //   } else if (
  //     program.controlling_school_name ===
  //     'Хүрээлэн буй орчин, ойн инженерчлэлийн тэнхим'
  //   ) {
  //     envor.push(program);
  //   } else if (
  //     program.controlling_school_name ===
  //     'Электроник, холбооны инженерчлэлийн тэнхим'
  //   ) {
  //     elec.push(program);
  //   } else if (
  //     program.controlling_school_name === 'Хэрэглээний математикийн тэнхим'
  //   ) {
  //     math.push(program);
  //   }
  // }

  // let mkutStudents = [],
  //   envorStudents = [],
  //   electStudents = [],
  //   chemStudents = [],
  //   mathStudents = [];

  // for (const student of seasStudentsState.rows) {
  //   for (const mk of mkut) {
  //     if (student.major_name === mk.major_mongolian) {
  //       mkutStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const ch of chem) {
  //     if (student.major_name === ch.major_mongolian) {
  //       chemStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const env of envor) {
  //     if (student.major_name === env.major_mongolian) {
  //       envorStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const el of elec) {
  //     if (student.major_name === el.major_mongolian) {
  //       electStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const m of math) {
  //     if (student.major_name === m.major_mongolian) {
  //       mathStudents.push(student);
  //       break;
  //     }
  //   }
  // }

  // let mkutStudents = [],
  //   envorStudents = [],
  //   electStudents = [],
  //   chemStudents = [],
  //   mathStudents = [];

  // for (const student of seasStudentsState.rows) {
  //   for (const mk of mkut) {
  //     if (student.major_name === mk.major_mongolian) {
  //       mkutStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const ch of chem) {
  //     if (student.major_name === ch.major_mongolian) {
  //       chemStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const env of envor) {
  //     if (student.major_name === env.major_mongolian) {
  //       envorStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const el of elec) {
  //     if (student.major_name === el.major_mongolian) {
  //       electStudents.push(student);
  //       break;
  //     }
  //   }
  //   for (const m of math) {
  //     if (student.major_name === m.major_mongolian) {
  //       mathStudents.push(student);
  //       break;
  //     }
  //   }
  // }

  // console.log(
  //   'mkut = ',
  //   mkutStudents
  //   // 'chemical=',
  //   // chemStudents,
  //   // 'envor=',
  //   // envorStudents,
  //   // 'elect = ',
  //   // electStudents,

  //   // 'math = ',
  //   // mathStudents
  // );
  // let count = 0;
  // let countD = 0;
  // for (const item of mathStudents) {
  //   if (
  //     // item.studying_status === 'Өдрийн сургалт' &&
  //     item.academic_degree === 'Магистр' &&
  //     item.act_state === 'Идэвхтэй сурч байгаа'
  //   ) {
  //     count += item.state_number;
  //   }
  //   if (
  //     // item.studying_status === 'Өдрийн сургалт' &&
  //     item.academic_degree === 'Доктор' &&
  //     item.act_state === 'Идэвхтэй сурч байгаа'
  //   ) {
  //     countD += item.state_number;
  //   }
  // }

  // json.mkut = mkutStudents;
  // json.chemical = chemStudents;
  // json.envrmnt = envorStudents;
  // json.elect = electStudents;
  // json.math = mathStudents;

  // let seas = [],
  //   law = [],
  //   science = [],
  //   business = [],
  //   inter = [];

  // const lessinfo = await client.query('select * from lesson_info_2018_autumn');

  // for (const less of lessinfo.rows) {
  //   if (
  //     less.controlling_school ===
  //     'Хэрэглээний шинжлэх ухаан, инженерчлэлийн сургууль'
  //   ) {
  //     seas.push(less);
  //   } else if (less.controlling_school === 'Бизнесийн сургууль') {
  //     business.push(less);
  //   } else if (less.controlling_school === 'Хууль зүйн сургууль') {
  //     law.push(less);
  //   } else if (less.controlling_school === 'Шинжлэх ухааны сургууль') {
  //     science.push(less);
  //   } else if (
  //     less.controlling_school ===
  //     'Олон улсын харилцаа, нийтийн удирдлагын сургууль'
  //   ) {
  //     inter.push(less);
  //   }
  // }

  // const lessSchedule = await client.query('select * from schedule2018autumn');

  // let seasSchedule = [],
  //   lawSchedule = [],
  //   scienceSchedule = [],
  //   businessSchedule = [],
  //   interSchedule = [];

  // for (schedule of lessSchedule.rows) {
  //   seas.forEach((s) => {
  //     if (s.mongolian_name === schedule.lesson_name) {
  //       seasSchedule.push(schedule);
  //     }
  //   });
  //   law.forEach((s) => {
  //     if (s.mongolian_name === schedule.lesson_name) {
  //       lawSchedule.push(schedule);
  //     }
  //   });
  //   science.forEach((s) => {
  //     if (s.mongolian_name === schedule.lesson_name) {
  //       scienceSchedule.push(schedule);
  //     }
  //   });
  //   inter.forEach((s) => {
  //     if (s.mongolian_name === schedule.lesson_name) {
  //       interSchedule.push(schedule);
  //     }
  //   });
  //   business.forEach((s) => {
  //     if (s.mongolian_name === schedule.lesson_name) {
  //       businessSchedule.push(schedule);
  //     }
  //   });
  // }
  // let lec = 0,
  //   sem = 0,
  //   lab = 0;

  // scienceSchedule.forEach((seas) => {
  //   if (seas.lesson_state === 'Лекц') {
  //     lec++;
  //   } else if (seas.lesson_state === 'Лаборатори') {
  //     lab++;
  //   } else if (seas.lesson_state === 'Семинар') {
  //     sem++;
  //   }
  // });

  // console.log('lec = ', lec);
  // console.log('sem = ', sem);
  // console.log('lab = ', lab);
  const json = {};

  return json;
}
