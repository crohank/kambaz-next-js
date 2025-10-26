import Link from "next/link";
import {FormControl} from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>

            <FormControl id="wd-username" placeholder="username" className="mb-2 w-100"/>
            <FormControl
                id="wd-password"
                placeholder="Password"
                type="password"
                className="mb-2 w-100"
            />
            <FormControl
                id="wd-password-confirm"
                placeholder="Re-enter Password"
                type="password"
                className="mb-2 w-100"
            />
            <Link href="Profile" className="btn btn-primary w-100 mb-2">
                {" "}
                Sign up{" "}
            </Link>
            <br/>
            <Link href="Signin" className="btn btn-primary w-100 mb-2">
                {" "}
                Sign in{" "}
            </Link>
        </div>
    );
}
