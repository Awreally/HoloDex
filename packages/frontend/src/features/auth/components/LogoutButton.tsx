import { Form } from "react-router";
export function LogoutButton() {
    return (
        <Form method="POST" action="/logout" className="flex h-13 w-22 items-center justify-center gap-2 rounded-xl bg-primary font-title-md text-[15px] font-bold text-on-primary shadow-[0_6px_16px_rgba(97,57,144,0.28)] transition-colors hover:bg-primary-container">
        <button type="submit">
            Log Out
        </button>
        </Form>
    );
}