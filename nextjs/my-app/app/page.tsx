import Image from 'next/image'
import DragShuffleHero from '@/components/hero'
import { auth } from 'auth'
import { User } from '@/components/chat'
import Dashboard from '@/components/dashboard/dashboard';
import { Project } from '@/components/dashboard/columns';

async function getActiveProjects(user_email: string){
  
  try{
      const res = await fetch(`http://localhost:3000/api/projects/user/retrieve`, {
          cache: "no-store",
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({user_email: user_email, status: "active"}),
      });

      if (!res.ok) {
          throw new Error("Failed to fetch projects");
      }
      console.log("fetched projects");
      const projects =  await res.json();

      return projects;
      
  }
  catch(error){
      console.error(error);
      // Handle the error appropriately
      return [];
  }

}


async function getCompletedProjects(user_email: string){
  try{
      const res = await fetch(`http://localhost:3000/api/projects/user/retrieve`, {
          cache: "no-store",
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({user_email: user_email, status: "completed"}),
      });

      if (!res.ok) {
          throw new Error("Failed to fetch projects");
      }
      console.log("fetched projects");
      return await res.json();
      
  }
  catch(error){
      console.error(error);
      // Handle the error appropriately
      return [];
  }

}
export async function getAccountDetail(user_email: string){
  console.log(user_email);
  console.log("***************");
  try{
      const res = await fetch(`http://localhost:3000/api/projects/user/id`, {
          cache: "no-store",
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({user_email: user_email}),
      });
      if (!res.ok) {
          throw new Error("Failed to fetch account");
      }
      console.log("fetched Account");
      console.log(res);
      return res.json();

  }
  catch(error){
      console.error(error);
      // Handle the error appropriately
      return [];
  }   
}





export default async function Home() {
  const session = await auth()
  console.log(session);
  if (session) {
    const user = session.user as User;
    const active = await getActiveProjects(user.email as string);
    const completed = await getCompletedProjects(user.email as string);
    return (<Dashboard user={user} completed={completed.projects as Project[]} active={active.projects as Project[]}/>)

  }

  else{
    return (<DragShuffleHero />)
  }
}
