import VisitPage from "@/components/pages/VisitPage";

export default async function ProfileVisit({ params }) {
    
  return (
    <>
      <VisitPage userId={params.profilevisit}/>
    </>
  );
}
