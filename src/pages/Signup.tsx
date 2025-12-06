import { useState } from "react";
import { supabase } from "../integrations/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setMessage(error.message);
    else setMessage("Signup successful! Please check email to verify.");
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
}
