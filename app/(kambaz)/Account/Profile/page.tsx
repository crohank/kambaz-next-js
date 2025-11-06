/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {redirect} from "next/dist/client/components/navigation";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../reducer";
import {Button, FormControl} from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const fetchProfile = () => {
        if (!currentUser) return redirect("/Account/Signin");
        setProfile(currentUser);
    };
    const signout = () => {
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    return (
        <div className="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-username" className="me-2 w-25">Username</label>
                        <FormControl
                            id="wd-username"
                            defaultValue={profile.username}
                            onChange={(e) =>
                                setProfile({...profile, username: e.target.value})
                            }
                        />
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-password" className="me-2 w-25">Password</label>
                        <FormControl
                            id="wd-password"
                            defaultValue={profile.password}
                            onChange={(e) =>
                                setProfile({...profile, password: e.target.value})
                            }
                        />
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-firstname" className="me-2 w-25">First Name</label>
                        <FormControl
                            id="wd-firstname"
                            defaultValue={profile.firstName}
                            onChange={(e) =>
                                setProfile({...profile, firstName: e.target.value})
                            }
                        />
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-lastname" className="me-2 w-25">Last Name</label>
                        <FormControl
                            id="wd-lastname"
                            defaultValue={profile.lastName}
                            onChange={(e) =>
                                setProfile({...profile, lastName: e.target.value})
                            }
                        />
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-dob" className="me-2 w-25">Date of Birth</label>
                        <FormControl
                            id="wd-dob"
                            type="date"
                            defaultValue={profile.dob}
                            onChange={(e) => setProfile({...profile, dob: e.target.value})}
                        />
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <label htmlFor="wd-email" className="me-2 w-25">Email</label>
                        <FormControl
                            id="wd-email"
                            defaultValue={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="wd-role" className="me-2 w-25">Role</label>
                        <select
                            className="form-control"
                            id="wd-role"
                            defaultValue={profile.role}
                            onChange={(e) => setProfile({...profile, role: e.target.value})}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </div>

                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">Update</button>
                    <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </Button>
                </div>
            )}
        </div>
    );
}
