(function(){


var student = angular.module("student",[]);
var studentController = function($scope,$filter,$http) {

// dropdown options for selecting grades
 $scope.grades = ['A','B','C','D','F'];

 var jsonData = {
  "data": [
    {
      "_id": 1,
      "name": "Adam",
      "grades": [ "Math - D", "History - D", "Science - A", "English - B" ],
      "img": "https://i.pravatar.cc/300",
      "gender": "M",
      "birthday": "July 23, 2003",
      "athlete": true,
      "grade": 10
    },
    {
      "_id": 2,
      "name": "John",
      "grades": [ "Math - B", "History - B", "Science - B", "English - B" ],
      "img": "https://i.pravatar.cc/300",
      "gender": "M",
      "birthday": "September 8, 2005",
      "athlete": false,
      "grade": 8
    },
    {
      "_id": 3,
      "name": "Sarah",
      "grades": [ "Math - C", "History - B", "Science - B", "English - C" ],
      "img": "https://i.pravatar.cc/300",
      "gender": "F",
      "birthday": "January 17, 2004",
      "athlete": false,
      "grade": 9
    },
    {
      "_id": 4,
      "name": "Katie",
      "grades": [ "Math - D", "History - B", "Science - C", "English - B" ],
      "img": "https://i.pravatar.cc/300",
      "gender": "F",
      "birthday": "October 6, 2005",
      "athlete": true,
      "grade": 8
    },
    {
      "_id": 5,
      "name": "Phil",
      "grades": [ "Math - F", "History - B", "Science - C", "English - D" ],
      "img": "https://i.pravatar.cc/300",
      "gender": "M",
      "birthday": "August 13, 2001",
      "athlete": false,
      "grade": 12
    }
  ]
}

$scope.studentdata = jsonData.data; 

// variables and bindings to find max and min GPA
 var max = 0;
 var min = 4;
 $scope.max_gpa;    
 $scope.min_gpa;
 $scope.gpa_max;
 $scope.gpaList = [];
 
 // this function will calculate the gpa for all students and store in array gpaList 
 // gpaList will be use to get the next max/min gpa after a max/min row is deleted from table
 $scope.getdata = function(){
  for(var i=0;i<$scope.studentdata.length;i++){
     $scope.gpaList[i] = $scope.calculateGPA(i);    
    }
}


// function to calculate the GPA 
$scope.calculateGPA = function(index){
    var gradePointTotal = 0;
    var n = $scope.studentdata[index].grades.length;
    for(var i = 0; i < n ; i++){
        var courses = $scope.studentdata[index].grades[i];
        var grade = $filter('limitTo')(courses,-1); 
        gradePointTotal += getGradePoints(grade);
    }
    var gpa = gradePointTotal/12;  // formula: (total Grade points / total no of credits)
    $scope.gpa_value= gpa;

    if(max < gpa) {
        max = gpa;
        $scope.max_gpa = gpa;
}

    if(min > gpa){
        min = gpa;
        $scope.min_gpa = gpa;
}
   
    return gpa;
}

var getGradePoints = function(grade){
    var points = 0;
    switch(grade){
            case 'A': points = (4*3);  // assuming 3 credits for each course
                    break;
            case 'B': points += (3*3);
                    break;
            case 'C': points += (2*3);
                    break;
            case 'D': points += (1*3);
                    break;
            case 'F': points += 0;
                    break;
            default: break;

            }
    return points;
}

$scope.addStudent = function(){     
    jsonData.data.push({
                    "name": $scope.name,
                    "grades": [ "Math - "+$scope.math, "History - "+$scope.history, "Science - "+$scope.science, "English - "+$scope.english ],
                    });
 $scope.name ='';
 $scope.math='';
 $scope.history='';
 $scope.science='';
 $scope.english='';

}

$scope.deleteStudent = function (index) {

        // Remove from main array 
        if($scope.studentdata.length){
           jsonData.data.splice(index, 1);
           $scope.gpaList.splice(index,1);
            //alert($scope.gpaList);
        }
// if row removed is the max/min row then get the new min/max after removing the row
var min=4;
var max=0;
for(var i=0;i<$scope.gpaList.length;i++){
            if(max <$scope.gpaList[i]) {
                    max = $scope.gpaList[i];
                    $scope.max_gpa = $scope.gpaList[i];
            }

            if(min > $scope.gpaList[i]){
                    min = $scope.gpaList[i];
                    $scope.min_gpa = $scope.gpaList[i];
            }
                    
         }
    }

}

student.controller("StudentController",studentController);

}());
