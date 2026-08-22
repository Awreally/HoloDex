type TabsAuthProps = {
  active: "signin" | "register";
  setActive: (value: "signin" | "register") => void;
};

export function TabsAuth({ active, setActive }: TabsAuthProps) {
  return (
    <div>
      <button type="button" onClick={() => setActive("signin")}>
        Sign in
      </button>
      <button type="button" onClick={() => setActive("register")}>
        Create Account
      </button>
    </div>
  );
}
