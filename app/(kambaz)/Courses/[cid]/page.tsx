import { redirect } from "next/navigation";

// Define an explicit type for the page's props
type Props = {
  params: { cid: string };
};

// You can make this async as well for consistency, though it's not required for a redirect
export default function CoursesPage({ params }: Props) {
  const { cid } = params;
  redirect(`/Courses/${cid}/Home`);
}