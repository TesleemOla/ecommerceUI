import { redirect } from 'next/navigation';
import { AuthUser } from '@/lib/authClient';

export default async function DashboardRouterPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    // If no user session, redirect to login page
    redirect('/auth/login');
  }

  // Redirect based on user type
  switch (session.user.type) {
    case 'customer':
      redirect('/dashboard/user');
      break;
    case 'store_owner':
      redirect('/dashboard/store');
      break;
    case 'superadmin':
      redirect('/dashboard/superadmin');
      break;
    default:
      // Fallback for unknown user types or if type is missing
      // You might want to redirect to a generic user dashboard or an error page
      console.warn('Unknown user type:', session.user.type);
      redirect('/dashboard/user'); // Default to user dashboard for safety
      break;
  }
}
