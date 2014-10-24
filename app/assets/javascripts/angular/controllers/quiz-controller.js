app.controller('QuizController', ['$scope', '$timeout', 'Quiz', 'Question',
  function($scope, $timeout, Quiz, Question) {
  
  // views = ng-show
  $scope.quizView = true;
  $scope.questionsView = false;
  $scope.scoreView = false;

  $scope.quizzes = Quiz.query();

  $scope.quizSelected = function(quiz) {
    $scope.quizView = false;
    $scope.questionsView = true;

    $scope.currentQuestion = 0;
    $scope.correctAnswers = 0;
    
    // define .questions by queryinng quizId
    $scope.questions = Question.query({quizId: quiz.id}, function(quizzes) {
    // callback = quiz object; define quiz object's question & answer
      for (var i = 0; i < quizzes.length; i++) {
        quizzes[i].choices = quizzes[i].choices.split(';');
        $scope.question = $scope.questions[$scope.currentQuestion];
      }
      $scope.totalQuestions = quizzes.length;
    });
  };

  $scope.updateQuestion = function() {
    $scope.question.$update({quizId: $scope.question.quiz_id}, function(data) {
      // data.choices = data.choices.split(';');
      $scope.question = data;
    });
  };

  $scope.submitQuestion = function(question) {
    if (question.answer == question.selection) {
      $scope.correctAnswers++;
    }
    $scope.currentQuestion += 1;
    if ($scope.currentQuestion == $scope.questions.length) {
      $scope.showScore();
    } else {
      $scope.question = $scope.questions[$scope.currentQuestion];
    }

  };

  $scope.mainMenu = function() {
    $scope.quizView = true;
    $scope.scoreView = false;
  };

  $scope.showScore = function() {
    $scope.questionsView = false;
    $scope.scoreView = true;
    $timeout($scope.mainMenu(), 1000);
  };
}]);