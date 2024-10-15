import Link from 'next/link';

export default function ApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-orange-400 h-2" aria-hidden="true" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Account Approval Pending
          </h1>
          <div className="bg-orange-100 border-l-4 border-orange-400 p-4 mb-6">
            <div className="flex items-center mb-2">
              <svg
                className="h-6 w-6 text-orange-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="font-semibold text-orange-700">Under Review</p>
            </div>
            <p className="text-orange-600">
              Your account is currently under review.
            </p>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our team is working to approve your registration as soon as
            possible. You will be notified via email once your account has been
            approved.
          </p>
          <p className="text-center font-semibold mb-6">
            Thank you for your patience!
          </p>
          <div className="flex justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Go to Login Page
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 px-8 py-4">
          <p className="text-sm text-gray-500 text-center">
            We&apos;re processing your application
          </p>
        </div>
      </div>
    </div>
  );
}
