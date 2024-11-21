'use client';

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(response => response.json())
        .then(data => {
          if (data) {
            setUser(data);
            setIsAdmin(data.admin || false);
          }
          setProfileFetched(true);
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
          setProfileFetched(true);
        });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData.user); // Update state with the latest data
        resolve();
      } else {
        const errorData = await response.json();
        reject(errorData.error || 'Failed to update profile');
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: (err) => err,
    });
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user || {}} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
