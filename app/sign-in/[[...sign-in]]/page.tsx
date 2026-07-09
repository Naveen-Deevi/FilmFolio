import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center relative px-4 pt-32 pb-20">
      {/* Background Decorative */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-primary)] opacity-10 blur-[150px] -z-10 pointer-events-none" />
      
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </main>
  );
}
