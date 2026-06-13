import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-neutral-200 to-neutral-500 bg-clip-text text-transparent">Genesis One</h1>
          <p className="text-neutral-400 mt-2 text-sm">Create your Venture OS account</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "bg-white text-black hover:bg-neutral-200 text-sm font-semibold",
              card: "bg-neutral-950 border border-neutral-800 shadow-2xl rounded-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-neutral-400",
              socialButtonsBlockButton: "border-neutral-800 hover:bg-neutral-900 text-white",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-neutral-800",
              dividerText: "text-neutral-500",
              formFieldLabel: "text-neutral-300",
              formFieldInput: "bg-neutral-900 border-neutral-800 text-white focus:ring-white focus:border-white",
              footerActionText: "text-neutral-400",
              footerActionLink: "text-white hover:text-neutral-300",
            }
          }}
        />
      </div>
    </div>
  );
}
