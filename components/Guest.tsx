import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div className="mt-30 flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-5xl">Welcome to Budgetto</h1>
      <p>Please sign in or sign up to start tracking your expenses.</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
