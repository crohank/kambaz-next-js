"use client";

import {usePathname} from "next/navigation";
import React from "react";

export default function BreadcrumbClient() {
    const pathname = usePathname() || "";
    const segments = pathname.split("/");
    const section = segments[3] || "Home";

    return (
        <span className="text-danger">
      {" > "}
            {section}
    </span>
    );
}
