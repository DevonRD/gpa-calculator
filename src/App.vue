<template>
<div id="app" :style="{background: gradient}">
  <div id="gpa-calc-app">
    <h1>GPA Calculator 1.0</h1>

    <p><button class="menu-button" @click="downloadData()">Save Data</button>
    <button class="menu-button" @click="uploadData()">Load Data</button>
    <button class="menu-button" @click="reset()">Reset</button></p>

    <div v-for="(semester, sem_index) in semesters"
        :key="sem_index" class="semester-wrapper">
      <hr>
      <div class="semester-data">
        <p>
          <input type="checkbox" id="semester-checkbox" 
              @change="updateGPA()"
              v-model="semester.included">
          <input :value="semester.title" 
              @input="updateSectionAttribute($event, sem_index, 'title', 'gpa')" 
              placeholder="Semester (e.g. Fall 2022)" />
          <button @click="removeSection(sem_index)">Delete Semester</button>
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
          <button @click="startCustomGrade(sem_index, course_index)">Custom Grade</button>
          <button @click="removeComponent(sem_index, course_index, 'gpa')">Delete Course</button>
        </div>
        <p><button @click="addComponent(sem_index, 'gpa')">Add Course</button></p>
        <p>Semester credits: {{semester.credits}}, Semester GPA: {{semester.gpa}}</p>
      </div>
    </div>
    <hr>
    <p><button @click="addSection()">Add Semester</button></p>
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

    <div v-for="(sec, sec_index) in customGrades"
        :key="sec_index" class="semester-wrapper">
      <hr>
      <div class="semester-data">
        <p>
          <input type="checkbox" id="semester-checkbox" 
              @change="updateCourseGrade()"
              v-model="sec.included">
          <input :value="sec.title" 
              @input="updateSectionAttribute($event, sec_index, 'title', 'grade')" 
              placeholder="Section (e.g. Quizzes)" />
          <input :value="sec.weight" 
              @input="updateSectionAttribute($event, sec_index, 'weight', 'grade')" 
              placeholder="Weight percent (e.g. 20%)" />
          <button @click="removeSection(sec_index, 'grade')">Delete</button>
        </p>
        <div v-for="(assignment, assign_index) in sec.assignments"
            :key="assign_index">
          <input type="checkbox" id="course-checkbox" 
              @change="updateCourseGrade()"
              v-model="customGrades[sec_index].assignments[assign_index].included">
          <input :value="assignment.title" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'title', 'grade')" 
              placeholder="Assignment (e.g. Quiz 1)" />
          <input :value="assignment.score" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'score', 'grade')" 
              placeholder="Score" />
          <input :value="assignment.points" 
              @input="updateComponentAttribute($event, sec_index, assign_index, 'points', 'grade')" 
              placeholder="Out of" />
          <button @click="removeComponent(sec_index, assign_index, 'grade')">Delete</button>
        </div>
        <p><button @click="addComponent(sec_index, 'grade')">Add assignment</button></p>
        <p>{{sec.title}} score: {{sec.score}}/{{sec.points}} points, {{sec.pct}}%</p>
      </div>
    </div>
    <hr>
    <p><button @click="addSection('grade')">Add grade section</button></p>
    <p>Total {{tempName}} weighted percentage: {{tempPct}}%, Weighted grade: {{tempGrade}}</p>
    <h3 v-if="weightError">
      NOTE: Your weights don't currently add up to 100%. This could cause an incorrect grade calculation, 
      unless this is intended.
    </h3>
  </div>
  <!--
  <Teleport to="body">
    <modal :show="weightError" @close="weightError = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
  -->
</div>
</template>

<script>
import Modal from './components/Modal.vue';
let ref = {
  "A+": [4.0, 97.0],
  "A": [4.0, 93.0],
  "A-": [3.7, 90.0],
  "B+": [3.3, 87.0],
  "B": [3.0, 83.0],
  "B-": [2.7, 80.0],
  "C+": [2.3, 77.0],
  "C": [2.0, 73.0],
  "C-": [1.7, 70.0],
  "D+": [1.3, 67.0],
  "D": [1.0, 63.0],
  "D-": [0.7, 60.0],
  "F": [0.0, 0.0]
};
let debug = true;
export default {
  // npm run serve
  // npm i
  components: {
    Modal
  },
  data() {
    return {
      //gradient: 'linear-gradient(315deg,#36fa7a,#D49CE6,#2E1BDA)',
      gradient: 'linear-gradient(315deg,#1bd3ef,#2E1BDA)',
      mode: 'college',
      semesters: [],
      gpa: 0,
      hours: 0,

      tempSem: 0,
      tempCourse: 0,
      tempName: '',
      tempPct: 0.0,
      tempGrade: '',
      customGrades: [],

      weightError: false
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
    updateSectionAttribute(e, sec_index, attribute, mode='gpa') {
      if (mode == 'gpa') this.semesters[sec_index][attribute] = e.target.value;
      else this.customGrades[sec_index][attribute] = e.target.value;

      if (attribute != 'title') this.updateCalculations(mode);
    },

    updateComponentAttribute(e, sec_index, comp_index, attribute, mode='gpa') {
      if (mode == 'gpa') this.semesters[sec_index].courses[comp_index][attribute] = e.target.value;
      else this.customGrades[sec_index].assignments[comp_index][attribute] = e.target.value;
      
      if (attribute != 'title') this.updateCalculations(mode);
    },

    updateCalculations(mode) {
      if (mode == 'gpa') this.updateGPA();
      else this.updateCourseGrade();
    },

    updateGPA() {
      let points = 0;
      let hours = 0;
      this.semesters.forEach(function(semester) {
        let semPoints = 0;
        let semHours = 0;
        semester['courses'].forEach(function(course) {
          if (course.included) {
            semPoints += parseInt(course.credits) * ref[course.grade.toUpperCase()][0];
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
      let totalGrade = 0;
      let totalWeight = 0;
      //let score = 0;
      //let points = 0;
      this.customGrades.forEach(function(section) {
        let secWeight = parseFloat(section.weight.replace('%', ''));
        totalWeight += secWeight;
        let secScore = 0;
        let secPoints = 0;
        section['assignments'].forEach(function(assignment) {
          if (assignment.included) {
            secScore += parseFloat(assignment.score);
            secPoints += parseFloat(assignment.points);
          }
        });
        section.score = secScore;
        section.points = secPoints;
        section.pct = 100.0 * secScore / secPoints;
        if (section.included) {
          //score += secScore;
          //points += secPoints;
          totalGrade += secWeight * secScore / secPoints;
        }
      });
      this.tempPct = totalGrade;
      if (Math.abs(totalWeight - 100.0) > 0.0001) this.weightError = true;
      else this.weightError = false;

      console.log('\tweighted: ' + totalGrade);
      for (let key in ref) {
        let target = ref[key][1];
        if (totalGrade >= target) {
          this.tempGrade = key;
          break;
        }
      }
      if (debug) console.log('\tCourse score updated, grade: ' + this.tempGrade)
    },

    addSection(mode='gpa') {
      if (debug) console.log('@ COMMAND: Add section, mode: ' + mode);

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
        frac: 0.0,
        weight: "",
        included: true
      };

      // Add a new semester/grade section
      if (mode == 'gpa') this.semesters.push(newSem);
      else this.customGrades.push(newGradeSec);
    },

    removeSection(sec_index, mode='gpa') {
      if (debug) console.log('@ COMMAND: Remove section, mode: ' + mode + ', index: ' + sec_index);

      // Remove semester/grade section
      if (mode == 'gpa') this.semesters.splice(sec_index, 1);
      else this.customGrades.splice(sec_index, 1);
      
      this.updateCalculations(mode);
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

      // Add a new course/assignment
      if (mode == 'gpa') this.semesters[sec_index].courses.push(newCourse);
      else this.customGrades[sec_index].assignments.push(newAssignment);
    },

    removeComponent(sec_index, comp_index, mode) {
      // Remove a course/assignment
      if (mode == 'gpa') this.semesters[sec_index].courses.splice(comp_index, 1);
      else this.customGrades[sec_index].assignments.splice(comp_index, 1);

      this.updateCalculations(mode);
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

    startCustomGrade(sem_index, course_index) {
      this.gradient = 'linear-gradient(315deg,#f49d23,#880000)';
      document.getElementById('gpa-calc-app').style.display = 'none';
      document.getElementById('course-grade-calc').style.display = 'block';

      this.semesters[sem_index].courses[course_index].custom = true;
      this.tempSem = sem_index;
      this.tempCourse = course_index;
      this.tempName = this.semesters[sem_index].courses[course_index].title;
      this.customGrades = this.semesters[sem_index].courses[course_index].customGrades;

      this.updateCourseGrade();
    },

    applyCustomGrade() {
      this.semesters[this.tempSem].courses[this.tempCourse].customGrades = this.customGrades;
      this.revertToGPA();
    },

    deleteCustomGrade() {
      this.semesters[this.tempSem].courses[this.tempCourse].custom = false;
      this.semesters[this.tempSem].courses[this.tempCourse].customGrades = [];
      
      this.revertToGPA()
    },

    revertToGPA() {
      this.semesters[this.tempSem].courses[this.tempCourse].grade = this.tempGrade;

      this.tempSem = 0;
      this.tempCourse = 0;
      this.tempName = '';
      this.customGrades = [];

      this.gradient = 'linear-gradient(315deg,#1bd3ef,#2E1BDA)';
      document.getElementById('gpa-calc-app').style.display = 'block';
      document.getElementById('course-grade-calc').style.display = 'none';
    },

    resetCustom() {
      this.customGrades = [];
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
  padding: 4%;
  display: block;
}
#course-grade-calc {
  padding: 4%;
  display: none;
}
#test {
  color: #36fa7a; /* old green */
  color: #2E1BDA; /* blue */
  color: #1bd3ef; /* light blue */
  color: #880000; /* crimson */
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
.semester-data {
  /*border: 1px solid white;
  border-radius: 8px;*/
  padding: 1%;
}
a {
  color: white;
}

</style>
