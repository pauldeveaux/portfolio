import {ContactFormData} from '@/types/Contact';
import {fetchBackend} from "@/lib/backend/fetchBackend";


export async function sendEmail(form: ContactFormData) {
    return fetchBackend<{ message: string}>(
        "/email/contact",
        {
            method: "POST",
            body: form,
        }
    )
}