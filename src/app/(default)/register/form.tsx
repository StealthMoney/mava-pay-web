"use client";

import React, { useRef } from "react";
type RegisterFormProps = {
  action: (x: FormData) => Promise<{ error?: string; success?: boolean }>;
};

const RegisterForm = ({ action }: RegisterFormProps) => {
  // const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const validateData = () => {
    if (error) {
      setError("");
    }
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return false;
    }
    if (passwordRef.current?.value && passwordRef.current?.value.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const isButtonDisabled =
    loading ||
    error !== "" ||
    !passwordsMatch;

  const formAction = async (formData: FormData) => {
    const isValid = validateData();
    if (isValid === false) {
      return;
    }
    setLoading(true);
    const res = await action(formData);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    // setError("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
    // redirect("/account/activate");
  };

  const confirmSamePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = passwordRef.current?.value
    const confirmPasswordValue = confirmPasswordRef.current?.value
    if (confirmPasswordValue && passwordValue) {
      setPasswordsMatch(passwordValue === confirmPasswordValue)
    }
  }

  React.useEffect(() => {
    if (error === "") {
      return;
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  // React.useEffect(() => {
  //   setPasswordsMatch(password === confirmPassword);
  // }, [password, confirmPassword]);
  return (
    <div className="grid w-full mt-[10vh] place-items-center">
      <form
        action={formAction}
        className="flex flex-col gap-6 md:gap-10 w-[200px] md:w-[396px]"
      >
        <p className="text-center text-xl md:text-3xl font-bold text-custom-gray-100">Create Account</p>
        {error ? (
          <div
            className={`bg-none ${
              error ? "bg-red-100" : ""
            } rounded-lg px-5 py-4 mb-5 flex items-center justify-center text-[14px] text-red-700 font-semibold opacity-[0.8]`}
          >
            <p>{error}</p>
          </div>
        ) : null}

        <div className="w-full flex flex-col gap-4 md:gap-7">
          <input
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="text"
            name="name"
            required
            // value={email}
            placeholder="Full name"
            // onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="email"
            name="email"
            required
            // value={email}
            placeholder="Email"
            // onChange={(event) => setEmail(event.target.value)}
          />
          <input
            ref={passwordRef}
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="password"
            name="password"
            required
            // value={email}
            placeholder="Password"
            // onChange={(event) => setEmail(event.target.value)}
            onChange={confirmSamePassword}
          />
          <input
            ref={confirmPasswordRef}
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="password"
            name="confirmPassword"
            required
            // value={email}
            placeholder="Confirm Password"
            // onChange={(event) => setEmail(event.target.value)}
            onChange={confirmSamePassword}
          />
        </div>

        <input type="submit" name="submit" value="Create Account" className="bg-brand-primary py-3 md:py-5 font-bold text-base text-white rounded-lg tracking-wide " />
      </form>
    </div>
  );
};

export default RegisterForm;
