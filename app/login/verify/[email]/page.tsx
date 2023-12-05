'use client';
import Link from "next/link";
import { emailSchema } from "@/app/_models/formValidation";
import { useRouter } from "next/navigation";

export default function VerifyEmail({ params }: { params: { email: string } }) {
  const router = useRouter();
  const email = decodeURIComponent(params.email);
  if (!email || !emailSchema.safeParse(email).success) {
    router.replace("/");
  }
  return (
    <>
      <div>Verify Email to start using your crypt: {email}. Not yet implemented. Return Home to login.</div>
      <Link className='text-blue-600' href={"/"}>
        Home
      </Link>
    </>
  );
}
