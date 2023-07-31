const deleteCourseFromUser =async(courses)=>{
    const userCoursesInMember = courses.filter((course) => course.memberId && course.memberExpiredTime > Date.now() )
    const userEnrolledCourses = courses.filter((course) => !course.memberId  )
    return [...userCoursesInMember,...userEnrolledCourses]
}
module.exports = deleteCourseFromUser
