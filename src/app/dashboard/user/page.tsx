import { redirect } from 'next/navigation';
import { apiFetch } from '@/lib/apiClient';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default async function UserDashboardPage() {


  let userProfile: UserProfile | null = null;
  let error: string | null = null;

//   try {
//     // Fetches user data from an endpoint like `/api/profile/me`
//     userProfile = await apiFetch<UserProfile>('/profile/me');
//   } catch (e) {
//     error = e instanceof Error ? e.message : 'Failed to fetch user profile.';
//   }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
      {error && <div className="text-red-500 bg-red-100 p-3 rounded-md">{error}</div>}
      {userProfile && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Name</p>
            {/* <p className="text-lg font-semibold">{userProfile.name}</p> */}
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            {/* <p className="text-lg font-semibold">{userProfile.email}</p> */}
          </div>
        </div>
      )}
    </section>
  );
}