import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-4">
      <h2>Profile</h2>
          <div className="mb-3">
            <input 
              defaultValue="alice" 
              placeholder="username" 
              className="form-control wd-username"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="123" 
              placeholder="password" 
              type="password"
              className="form-control wd-password"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="Alice" 
              placeholder="First Name" 
              id="wd-firstname"
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="Wonderland" 
              placeholder="Last Name" 
              id="wd-lastname"
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="dd-mm-yyyy" 
              placeholder="mm/dd/yyyy"
              type="date" 
              id="wd-dob"
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="alice@wonderland" 
              type="email" 
              id="wd-email"
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <select 
              defaultValue="FACULTY" 
              id="wd-role"
              className="form-select"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          
          <Link href="Signin" className="btn btn-danger w-100">
            Sign out
          </Link>
        </div>
  );
}