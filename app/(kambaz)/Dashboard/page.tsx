import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/MERN.jpg" width={200} height={150} alt="MERN" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image src="/images/AI.jpg" width={200} height={150} alt="MERN" />
            <div>
              <h5> CS1235 AI </h5>
              <p className="wd-dashboard-course-title">
                Artificial Intelligence
              </p>
              <button> Go </button>
            </div>
          </Link> </div>
        <div className="wd-dashboard-course"> <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image src="/images/CS.jpg" width={200} height={150} alt="MERN" />
            <div>
              <h5> CS1236 Cyber Security </h5>
              <p className="wd-dashboard-course-title">
                Cyber Security
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>
          <div className="wd-dashboard-course"> <Link href="/Courses/1237" className="wd-dashboard-course-link">
            <Image src="/images/DA.jpg" width={200} height={150} alt="DA" />
            <div>
              <h5> CS1237 DA </h5>
              <p className="wd-dashboard-course-title">
                Data Analytics
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>
          <div className="wd-dashboard-course"> <Link href="/Courses/1238" className="wd-dashboard-course-link">
            <Image src="/images/DL.jpg" width={200} height={150} alt="DL" />
            <div>
              <h5> CS1238 DL </h5>
              <p className="wd-dashboard-course-title">
                Deep Learning
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>
          <div className="wd-dashboard-course"> <Link href="/Courses/1239" className="wd-dashboard-course-link">
            <Image src="/images/ML.jpg" width={200} height={150} alt="ML" />
            <div>
              <h5> CS1239 DL </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>
          <div className="wd-dashboard-course"> <Link href="/Courses/1240" className="wd-dashboard-course-link">
            <Image src="/images/oop.jpg" width={200} height={150} alt="OOP" />
            <div>
              <h5> CS1240 OOP </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Programming
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>
          
      </div>
    </div>
);}

