type TabsAuthProps = {
  active: "signin" | "register";
  setActive: (value: "signin" | "register") => void;
};

export function TabsAuth({ active, setActive }: TabsAuthProps) {
  return (
    <div className="flex gap-1 rounded-md bg-surface-container p-1">
      <button
        type="button"
        onClick={() => setActive("signin")}
        className={`flex-1 rounded py-2.5 px-3 text-sm transition-colors ${
          active === "signin"
            ? "bg-surface-container-lowest text-on-surface font-semibold shadow-sm"
            : "text-on-surface-variant font-normal"
        }`}
      >
        Sign in
      </button>
      <button
        type="button"
        onClick={() => setActive("register")}
        className={`flex-1 rounded py-2.5 px-3 text-sm transition-colors ${
          active === "register"
            ? "bg-surface-container-lowest text-on-surface font-semibold shadow-sm"
            : "text-on-surface-variant font-normal"
        }`}
      >
        Create Account
      </button>
    </div>
  );
}
