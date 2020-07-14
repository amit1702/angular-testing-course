import {CoursesService} from './courses.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {COURSES} from '../../../../server/db-data';


describe('CourseService', () => {
  let courseService: CoursesService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });
    courseService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    courseService.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12);

        const course = courses.find(courseObj => courseObj.id === 12);
        expect(course.titles.description).toBe('Angular Testing Course', 'Course description does not match');
      });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
  });

  it('should retrieve course with id 12', () => {
    courseService.findCourseById(12)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });


});
