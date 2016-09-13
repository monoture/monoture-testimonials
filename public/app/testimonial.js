/**
 * Testimonial Config
 */
monoture.config(function($routeProvider, nav) {
  $routeProvider.when('/testimonials', {
    templateUrl : 'app/views/testimonials.html',
    controller : 'TestimonialsListController'
  }).
  when('/testimonials/edit/:testimonial', {
    templateUrl : 'app/views/testimonial.html',
    controller : 'TestimonialsEditController'
  }).
  when('/testimonials/new', {
    templateUrl : 'app/views/testimonial.html',
    controller : 'TestimonialsEditController'
  });

  nav['Testimonials'] = '/testimonials';
});

/**
 * Testimonial Service
 */
angular.module('monoture').factory('testimonialService', function($http, $location, authProvider) {

  return {

    getAll : function() {
      return $http({
        url : '/api/v1/testimonials',
        method : 'GET',
        params : {access_token : authProvider.getUser().token}
      }).catch(authProvider.checkApiResponse);
    },

    // Retrieve a testimonial model
    getTestimonial : function(id) {
      return $http({
        url : '/api/v1/testimonials/' + id,
        method : 'GET',
        params : {access_token : authProvider.getUser().token}
      }).catch(authProvider.checkApiResponse);
    },

    // Saves a testimonial
    saveTestimonial : function(testimonial) {
      return $http({
        url : '/api/v1/testimonials/' + testimonial._id,
        method : 'PUT',
        params : {access_token : authProvider.getUser().token},
        data : testimonial
      }).catch(authProvider.checkApiResponse);
    },

    // Creates a new testimonial
    createTestimonial : function(testimonial) {
      return $http({
        url : '/api/v1/testimonials/',
        method : 'POST',
        params : {access_token : authProvider.getUser().token},
        data : testimonial
      }).catch(authProvider.checkApiResponse);
    },

    // Deletes a testimonial
    deleteTestimonial : function(id) {
      return $http({
        url : '/api/v1/testimonials/' + id,
        method : 'DELETE',
        params : {access_token : authProvider.getUser().token}
      }).catch(authProvider.checkApiResponse);
    },

  };
});

/**
 * Testimonials List Controller
 */
monoture.controller('TestimonialsListController', function($scope, $rootScope, $sce, testimonialService){
  $scope.loadTestimonials = function() {
    testimonialService.getAll().then(function(response){
      $scope.testimonials = response.data.data;
    });
  }

  $scope.delete = function(id) {
    testimonialService.deleteTestimonial(id).then(function(){
      $scope.loadTestimonials();
    }).catch(function(err){
      $scope.errors = err;
    });
  }

  $scope.loadTestimonials();
});

/**
 * Testimonials Edit Controller
 */
monoture.controller('TestimonialsEditController', function($scope, $rootScope, $sce, $location, $routeParams, testimonialService){
  $scope.save = function() {
    if ($scope.testimonial._id != undefined) {
      testimonialService.saveTestimonial($scope.testimonial).then(function(response){
        $location.path('/testimonials');
      }).catch(function(err){
        $scope.errors = err;
      });
    } else {
      testimonialService.createTestimonial($scope.testimonial).then(function(response){
        $scope.errors = false;
        $location.path('/testimonials');
      }).catch(function(err){
        $scope.errors = err;
      });
    }
  }

  if ($routeParams.testimonial != undefined) {
    testimonialService.getTestimonial($routeParams.testimonial).then(function(response){
      $scope.testimonial = response.data.data;
    }).catch(function(err){
      $location.path('/testimonials');
    });
  }

  $scope.convertImg = function(files){
    var file = files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      $scope.testimonial.img = reader.result;
      $scope.$apply();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
});
