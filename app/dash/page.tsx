'use client';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";


export default function Dashboard() { 
  const onLogOut = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({}),
    });
    if (!response.ok) {
        console.log("errors");
    }
    toast.promise(
      response.json(),
       {
         loading: 'Sealing Crypt...',
         success: <b>Crypt Sealed</b>,
         error: <b>Could not Log out</b>,
       }
     ).then(() => window.location.reload())
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("/api/user/currentUser", {
        method: "GET"
      });
      if (!response.ok) {
          console.log("errors");
      }
      const success = await response.json();
      setUser(success.user);
    }
    fetchCurrentUser();
  }, [])

  const [user, setUser] = useState<String>("");

  return (
    <main className='text-center h-screen flex justify-center items-center'>
      <Toaster />
      <div>
        <h1>Welcome to your crypt: {user}</h1>
        <h2 className="mb-2">Not yet implemented. Feel free to log out.</h2>
        <button onClick={onLogOut} className="text-blue-300 mt-4">Log out</button>
      </div>
    </main>
  );
};


