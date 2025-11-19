"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  const links = currentUser
    ? ["Profile"]
    : ["Signin", "Signup"];

  return (
    <Nav variant="pills" className="flex-column">
      
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      
      {currentUser && currentUser.role === "ADMIN" && (
        <NavItem>
          <NavLink
            as={Link}
            href={`/Account/Users`}
            active={pathname.endsWith("Users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
