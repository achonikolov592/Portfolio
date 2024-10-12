'use client';

export default function Form() {
  async function signIn(event:any) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const password = formData.get('password');

    console.log(name, password)

    try {
      const response = await fetch("http://localhost:3000/api/auth/signIn", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });


      const result = await response.json();
      console.log('Sign-in result:', result);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={signIn}>
        <input
          className="bg-blue-300 text-black"
          name="name"
          type="text"
          placeholder="Name"
          required
        />
        <input
          className="bg-yellow-300 text-black"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button className="text-white" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}