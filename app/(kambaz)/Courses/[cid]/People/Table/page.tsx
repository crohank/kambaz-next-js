/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../../Account/client";

export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const { cid } = useParams();   

  const fetchData = async () => {
    const allUsers = await client.findAllUsers();
    const allEnrollments = await client.findAllEnrollments();

    setUsers(allUsers);
    setEnrollments(allEnrollments);
  };

  useEffect(() => {
    fetchData();
  }, [cid]);

  const enrolledUsers = users.filter((user) =>
    enrollments.some(
      (enr) => enr.user === user._id && enr.course === cid
    )
  );

  return (
    <div>
      <h3>Users</h3>
      <PeopleTable users={enrolledUsers} fetchUsers={fetchData} />
    </div>
  );
}
