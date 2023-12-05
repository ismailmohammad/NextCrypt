'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { emailSchema } from "@/app/_models/formValidation";

export default function Verify() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');
    if (!email || !emailSchema.safeParse(email).success) {
        router.replace('/');
    }
    
    return <>Verify Email to start using your crypt: {email}</>;
}