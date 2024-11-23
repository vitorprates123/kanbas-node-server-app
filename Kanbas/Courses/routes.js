import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const status = dao.deleteCourse(courseId);
        res.send(status);
    });
    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    app.get("/api/courses/:courseId/Assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    })
    app.post("/api/courses/:courseId/Assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = assignmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    });

    app.post("api/courses/:courseId", (req, res) => {
        const { userId, courseId } = req.body;
        enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send({ status: "enrolled" });
    });

    app.delete("api/courses/:courseId", (req, res) => {
        const { userId, courseId } = req.body;
        enrollmentsDao.unenrollUserInCourse(userId, courseId);
        res.send({ status: "unenrolled" });
    });
    app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });






}
