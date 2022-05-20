<template>
<div id="app" :style="{background: gradient}">
  <div id="gpa-calc-app">
    <h1>GPA Calculator 1.0</h1>

    <p><button class="menu-button" @click="downloadData()">Save Data</button>
    <button class="menu-button" @click="uploadData()">Load Data</button>
    <button class="menu-button" @click="reset()">Reset</button></p>

    <div v-for="(semester, sem_index) in semesters"
        :key="sem_index" class="semester-wrapper">
      <div class="semester-data">
        <p>
          <input type="checkbox" id="semester-checkbox" 
              @change="updateGPA()"
              v-model="semester.included">
          <input :value="semester.title" 
              @input="updateSectionAttribute($event, sem_index, 'title', 'gpa')" 
              placeholder="Semester (e.g. Fall 2022)" />
          <button @click="removeSection(sem_index, 'gpa')">Delete</button>
        </p>
        <div v-for="(course, course_index) in semester.courses"
            :key="course_index">
          <input type="checkbox" id="course-checkbox" 
              @change="updateGPA()"
              v-model="semesters[sem_index].courses[course_index].included">
          <input :value="course.title" 
              @input="updateComponentAttribute($event, sem_index, course_index, 'title')" 
              placeholder="Course (e.g. EECS 445)" />
          <input :value="course.credits" 
              @input="updateComponentAttribute($event, sem_index, course_index, 'credits')" 
              placeholder="Credit hours" />
          <input v-if="course.custom" :value="course.grade" 
              @input="updateComponentAttribute($event, sem_index, course_index, 'grade')" 
              placeholder="Grade" disabled/>
          <input v-else :value="course.grade" 
              @input="updateComponentAttribute($event, sem_index, course_index, 'grade')" 
              placeholder="Grade" />
          <button @click="calcCourse(sem_index, course_index)">Custom</button>
          <button @click="removeComponent(sem_index, course_index, 'gpa')">Delete</button>
        </div>
        <p><button @click="addComponent(sem_index, 'gpa')">Add Course</button></p>
        <p>Semester credits: {{semester.credits}}, Semester GPA: {{semester.gpa}}</p>
      </div>
    </div>
    <p><button @click="addSection">Add Semester</button></p>
    <p>Total credit hours: {{hours}}, Overall GPA: {{gpa}}</p>
    <p>Made on a 
      <i class="icons fa fa-solid fa-plane fa-lg"></i> 
      by <a target="_blank" href="https://devondoyle.com/">Devon Doyle</a>
    </p>
  </div>
  <div id="course-grade-calc">
    <h1>Course Grade Calculator</h1>
    <p>{{tempName}}</p>
    <p><button class="menu-button" @click="applyCustomGrade()">Apply</button>
    <button class="menu-button" @click="deleteCustomGrade()">Remove Custom Grade</button>
    <button class="menu-button" @click="resetCustom()">Clear</button></p>

    <div v-for="(sec, sec_index) in semesters[tempSem].courses[tempCourse].customGrades"
        :key="sec_index" class="semester-wrapper">
      <div class="semester-data">
        <p>
          <input type="checkbox" id="semester-checkbox" 
              @change="updateCourseGrade()"
              v-model="sec.included">
          <input :value="sec.title" 
              @input="updateSectionAttribute($event, sec_index, 'title', 'grade')" 
              placeholder="Section (e.g. Quizzes)" />
          <button @click="removeSection(sec_index, 'grade')">Delete</button>
        </p>
        <div v-for="(assignment, assign_index) in sec.assignments"
            :key="assign_index">
          <input type="checkbox" id="course-checkbox" 
              @change="updateCourseGrade()"
              v-model="semesters[tempSem].courses[tempCourse].customGrades[sec_index].assignments[assign_index].included">
          <input :value="assignment.title" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'title', 'grade')" 
              placeholder="Assignment (e.g. Quiz 1)" />
          <input :value="assignment.score" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'score', 'grade')" 
              placeholder="Score" />
          <input :value="assignment.points" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'points', 'grade')" 
              placeholder="Out Of" />
          <button @click="removeComponent(sec_index, assign_index, 'grade')">Delete</button>
        </div>
        <p><button @click="addComponent(sec_index, 'grade')">Add Assignment</button></p>
        <p>Section score: {{sec.score}} / {{sec.points}}, {{sec.grade}}</p>
      </div>
    </div>
    <p><button @click="addSection('grade')">Add grade section</button></p>
    <p>Total course score: {{tempScore}} / {{tempPoints}}</p>
  </div>
</div>
</template>

<script>
let ref = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0
};
export default {
  // npm run serve
  // npm i
  data() {
    return {
      //gradient: 'linear-gradient(315deg,#36fa7a,#D49CE6,#2E1BDA)',
      gradient: 'linear-gradient(315deg,#1bd3ef,#2E1BDA)',
      mode: 'college',
      semesters: [
        {
          title: "",
          courses: [
            {
              title: "",
              credits: "",
              grade: "",
              color: "#ffffff",
              included: true, 
              custom: false,
              customGrades: [],
            }
          ],
          credits: 0,
          gpa: 0,
          included: true
        }
      ],
      gpa: 0,
      hours: 0,
      tempSem: 0,
      tempCourse: 0,
      tempScore: 0,
      tempPoints: 0,
      tempName: ''
    }
  },
  methods: {
    /*
    onInput(e) {
      this.text = e.target.value;
    },
    onMath(e) {
      this.math = parseFloat(e.target.value) * Math.PI;
      this.mathtext = e.target.value;
    },
    */
    updateSectionAttribute(e, sec_index, attribute, mode) {
      if (mode == 'gpa') this.semesters[sec_index][attribute] = e.target.value;
      else this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades[sec_index][attribute];
    },
    updateComponentAttribute(e, sec_index, comp_index, attribute, mode='gpa') {
      if (mode == 'gpa') {
        this.semesters[sec_index].courses[comp_index][attribute] 
          = e.target.value;
        if (attribute != 'title') this.updateGPA();
      }
      else {
        this.semesters[this.tempSem].courses[this.tempCourse]
            .customGrades[sec_index].assignments[comp_index][attribute]
          = e.target.value;
        if (attribute != 'title') this.updateCourseGrade();
      }
    },
    updateGPA() {
      let points = 0;
      let hours = 0;
      this.semesters.forEach(function(semester) {
        let semPoints = 0;
        let semHours = 0;
        semester['courses'].forEach(function(course) {
          if (course.included) {
            semPoints += parseInt(course.credits) * ref[course.grade.toUpperCase()];
            semHours += parseInt(course.credits);
          }
        });
        semester.credits = semHours;
        semester.gpa = semPoints / semHours;
        if (semester.included) {
          points += semPoints;
          hours += semHours;
        }
      });
      this.hours = hours;
      this.gpa = points / hours;
    },
    updateCourseGrade() {
      let score = 0;
      let points = 0;
      this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades.forEach(function(section) {
        let secScore = 0;
        let secPoints = 0;
        section['assignments'].forEach(function(assignment) {
          if (assignment.included) {
            secScore += parseInt(assignment.score);
            secPoints += parseInt(assignment.points);
          }
        });
        section.score = secScore;
        section.points = secPoints;
        section.percent = secScore / secPoints * 100.0;
        if (section.included) {
          score += secScore;
          points += secPoints;
        }
      });
      this.tempScore = score;
      this.tempPoints = points;
    },
    addSection(mode='gpa') {
      let newSem = {
        title: "",
        courses: [],
        credits: 0,
        gpa: 0,
        included: true
      };
      let newGradeSec = {
        title: "",
        assignments: [],
        score: "",
        points: "",
        grade: "",
        included: true
      };
      // Add a new semester to the GPA calculator
      if (mode == 'gpa') this.semesters.push(newSem);
      // Add a new grade section to the custom grade calculator
      else this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades.push(newGradeSec);
    },
    removeSection(sec_index, mode) {
      // Remove semester from GPA calculator
      if (mode == 'gpa') this.semesters.splice(sec_index, 1);
      // Remove grade section from custom grade calculator
      else this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades.splice(sec_index, 1);
    },
    addComponent(sec_index, mode) {
      let newCourse = {
        title: "",
        credits: "",
        grade: "",
        color: "#ffffff",
        included: true, 
        custom: false,
        customGrades: []
      };
      let newAssignment = {
        title: "",
        score: "",
        points: "",
        included: true
      };
      // Add a new course in the GPA calculator
      if (mode == 'gpa') this.semesters[sec_index].courses.push(newCourse);
      // Add a new assignment in the course grade calculator
      else this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades[sec_index].assignments.push(newAssignment);
    },
    removeComponent(sec_index, comp_index, mode) {
      // Remove a course from the GPA calculator
      if (mode == 'gpa') this.semesters[sec_index].courses.splice(comp_index, 1);
      // Remove an assignment from the course grade calculator
      else this.semesters[this.tempSem].courses[this.tempCourse]
          .customGrades[sec_index].assignments.splice(comp_index, 1);
    },
    downloadData() {
      let dataString = JSON.stringify(this.semesters);
      let elem = document.createElement('a');
      elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataString));
      elem.setAttribute('download', 'GPACalculatorData.json');
      elem.style.display = 'none';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    uploadData() {
      let input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
          let content = readerEvent.target.result;
          console.log('PARSED');
          console.log(JSON.parse(content));
          this.semesters = JSON.parse(content);
          this.updateGPA();
        }
      }
      input.click();
    },
    reset() {
      this.semesters = [
        {
          title: "",
          courses: [
            {
              title: "",
              credits: "",
              grade: "",
              color: "#ffffff",
              included: true, 
              custom: false,
              customGrades: []
            }
          ],
          credits: 0,
          gpa: 0,
          included: true
        }
      ];
      this.gpa = 0;
      this.hours = 0;
    },
    calcCourse(sem_index, course_index) {
      this.gradient = 'linear-gradient(315deg,#f49d23,#c20000)';
      document.getElementById('gpa-calc-app').style.display = 'none';
      document.getElementById('course-grade-calc').style.display = 'block';

      this.semesters[sem_index].courses[course_index].custom = true;
      this.tempSem = sem_index;
      this.tempCourse = course_index;
      this.tempName = this.semesters[sem_index].courses[course_index].title;
    },
    applyCustomGrade() {
      this.semesters[this.tempSem].courses[this.tempCourse].grade = 'a-';
      this.revertToGPA();
    },
    deleteCustomGrade() {
      this.semesters[this.tempSem].courses[this.tempCourse].custom = false;
      this.semesters[this.tempSem].courses[this.tempCourse].grade = '';
      this.revertToGPA()
    },
    revertToGPA() {
      this.tempSem = 0;
      this.tempCourse = 0;
      this.tempName = '';

      this.gradient = 'linear-gradient(315deg,#1bd3ef,#2E1BDA)';
      document.getElementById('gpa-calc-app').style.display = 'block';
      document.getElementById('course-grade-calc').style.display = 'none';
    },
    resetCustom() {
      this.semesters[this.tempSem].courses[this.tempCourse].customGrades = [];
    }
  }
}
</script>


<style>
html, body {
  margin: 0;
  min-height: 100vh;
}
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*color: #2c3e50;*/
  color: white;
}
#gpa-calc-app {
  padding: 5%;
  display: block;
}
#course-grade-calc {
  padding: 5%;
  display: none;
}
#test {
  color: #36fa7a; /* old green */
  color: #2E1BDA; /* blue */
  color: #1bd3ef; /* light blue */
  color: #c20000; /* crimson */
  color: #f49d23;
}
button {
  margin-right: 5px;
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 5px;
  margin: 5px;
}
button:hover {
  opacity: 60%;
}
.input {
  background: none;
  color: white;
  border: none;
  outline-color: white;
}
i {
  color: white;
  padding: 4px;
}
.semester-wrapper {
  padding-top: 1%;
  padding-bottom: 1%;
}
.semester-data {
  border: 1px solid white;
  border-radius: 8px;
  padding: 2%;
}
a {
  color: white;
}

</style>
