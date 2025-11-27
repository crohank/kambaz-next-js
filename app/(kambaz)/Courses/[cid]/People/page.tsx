/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import PeopleDetails from "./Details";
import * as client from "../../client";

export default function PeopleTable() {
  const pathname = usePathname();
  const courseId = pathname.split("/")[2];

  const [users, setUsers] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    const enrollments = await client.findEnrollmentsForCourse(courseId);
    const allUsers = await client.fetchAllUsers();

    const enrolledUsers = allUsers.filter((user: any) =>
      enrollments.some((e: any) => e.user === user._id)
    );

    setUsers(enrolledUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDetails = (uid: string) => {
    setSelectedUserId(uid);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedUserId(null);
    fetchUsers();
  };

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails uid={selectedUserId} onClose={closeDetails} />
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => openDetails(user._id)}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>

              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
