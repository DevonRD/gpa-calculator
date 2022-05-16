<template>
<div id="app" :style="{background: gradient}">
  <div id="inner-app">
    <h1>GPA Calculator 1.0</h1>

    <p><button class="menu-button" @click="downloadData()">Save Data</button>
    <button class="menu-button" @click="uploadData()">Load Data</button>
    <button class="menu-button" @click="reset()">Reset</button></p>

    <div v-for="(semester, sem_index) in semesters"
        :key="sem_index" class="semester-wrapper">
      <div class="semester-data">
        <p><input :value="semester.title" 
              @input="updateSemesterAttribute($event, sem_index, 'title')" 
              placeholder="Semester name (optional)" />
        <input type="checkbox" id="semester-checkbox" 
            @change="updateGPA()"
            v-model="semester.included">
        <label for="semester-checkbox">Include this semester</label></p>
        <div v-for="(course, course_index) in semester.courses"
            :key="course_index">
          <input :value="course.title" 
              @input="updateCourseAttribute($event, sem_index, course_index, 'title')" 
              placeholder="Course name (optional)" />
          <input :value="course.credits" 
              @input="updateCourseAttribute($event, sem_index, course_index, 'credits')" 
              placeholder="Credit hours" />
          <input :value="course.grade" 
              @input="updateCourseAttribute($event, sem_index, course_index, 'grade')" 
              placeholder="Grade" />
          <input type="checkbox" id="course-checkbox" 
              @change="updateGPA()"
              v-model="semesters[sem_index].courses[course_index].included">
          <label for="course-checkbox">Include this course</label>
        </div>
        <p><button @click="addCourse(sem_index)">Add Course</button></p>
        <p>Semester credits: {{semester.credits}}, Semester GPA: {{semester.gpa}}</p>
      </div>
    </div>
    <p><button @click="addSemester">Add Semester</button></p>
    <p>Total credit hours: {{hours}}, Overall GPA: {{gpa}}</p>
    <p>By <a href="https://www.github.com/devonrd">Devon Doyle</a></p>
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
  data() {
    return {
      //gradient: 'linear-gradient(315deg,#36fa7a,#D49CE6,#2E1BDA)',
      gradient: 'linear-gradient(315deg,#36fa7a,#2E1BDA)',
      mode: 'college',
      semesters: [
        {
          title: "",
          courses: [],
          credits: 0,
          gpa: 0,
          included: true
        }
      ],
      gpa: 0,
      hours: 0
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value;
    },
    onMath(e) {
      this.math = parseFloat(e.target.value) * Math.PI;
      this.mathtext = e.target.value;
    },
    updateSemesterAttribute(e, index, attribute) {
      this.semesters[index][attribute] = e.target.value;
    },
    updateCourseAttribute(e, sem_index, course_index, attribute) {
      //console.log(e.target.value);
      this.semesters[sem_index].courses[course_index][attribute] = e.target.value;
      if (attribute != 'title') {
        this.updateGPA();
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
    addSemester() {
      let newSem = {
        title: "",
        courses: [],
        credits: 0,
        gpa: 0,
        included: true
      };
      this.semesters.push(newSem);
    },
    addCourse(sem_index) {
      let newCourse = {
        title: "",
        credits: "",
        grade: "",
        color: "#ffffff",
        included: true
      };
      this.semesters[sem_index].courses.push(newCourse);
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
          courses: [],
          credits: 0,
          gpa: 0,
          included: true
        }
      ];
      this.gpa = 0;
      this.hours = 0;
    }
  }
}
</script>


<style>
body {
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*color: #2c3e50;*/
  color: white;
}
#inner-app {
  padding: 5%;
}
#test {
  color: #36fa7a
}
button {
  margin-right: 5px;
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 5px;
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
.semester-wrapper {
  padding-top: 1%;
  padding-bottom: 1%;
}
.semester-data {
  border: 1px solid white;
  border-radius: 8px;
  padding: 2%;
}

</style>
