import { redirect } from "next/navigation";


type Props = {
  params: Promise<{ cid: string }>; 
};


export default async function CoursesPage({ params }: Props) {
  const { cid } = await params; 
  redirect(`/Courses/${cid}/Home`);
}