import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className="flex h-14 items-center justify-between bg-violet-400 px-8 shadow-md">
      <h2 className="font-extrabold">BUDGET⋅TO</h2>
      <div>
        <SignedOut>
          <div className="rounded-full bg-indigo-600 p-2 font-semibold">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
