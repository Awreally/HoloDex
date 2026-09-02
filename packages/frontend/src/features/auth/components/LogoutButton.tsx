import { Form } from "react-router";
export function LogoutButton() {
    return (
        <Form method="POST" action="/logout" className="w-full">
            <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-surface-variant font-title-md text-[15px] font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
            >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Log Out
            </button>
        </Form>
    );
}