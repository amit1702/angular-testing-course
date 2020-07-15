import {CoursesService} from './courses.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {COURSES, findLessonsForCourse} from '../../../../server/db-data';
import {Course} from '../model/course';
import {HttpErrorResponse} from '@angular/common/http';


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

  it('should save the course data', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'Testing Course'
      }
    };
    courseService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course.id).toBe(12);
        expect(course.titles.description).toEqual(changes.titles.description);
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    req.flush({
      ...COURSES[12],
      ...changes
    });
  });

  it('should give an error when course save fails', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'Testing Course'
      }
    };
    courseService.saveCourse(12, changes)
      .subscribe(() => {
          fail('this save request should never succeed');
        },
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      );

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal server Error'
    });
  });

  it('should find a list of lessons', () => {
    courseService.findLessons(12)
      .subscribe(lessons => {
        expect(lessons).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      request => request.url === '/api/lessons'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
