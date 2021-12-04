import React from 'react';
import { getProviders, signIn } from 'next-auth/react';

const LoginPage = ({ providers }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-black min-h-screen w-full ">
      <img
        src="https://links.papareact.com/9xl"
        alt="Spotify"
        className="w-52 mb-5"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            type="button"
            className="bg-[#18d860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default LoginPage;
