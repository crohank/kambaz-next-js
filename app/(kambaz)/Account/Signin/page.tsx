import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" defaultValue="crohank" className="wd-username" /> <br />
     <input placeholder="password" defaultValue="123456" type="password" className="wd-password" /> <br />
     <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="/Account/Signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
