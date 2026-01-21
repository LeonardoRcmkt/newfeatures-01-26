import React, { useState } from "react";
import { Entrar } from "../Components/Login/Entrar";
import { InformeDocumento } from "../Components/Login/InformeDocumento";

export const Login = () => {
  const [user, setUser] = useState(null);

  const duasEtapas = true;
  if (!duasEtapas) {
    return (
      <section className='grid md:grid-cols-2 md:justify-evenly md:max-w-4xl md:mx-auto md:gap-4 '>
        <InformeDocumento />
        <Entrar />
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 w-full md:mx-auto md:gap-6 lg:gap-8'>
      {user === null ? (
        <InformeDocumento setUser={setUser} />
      ) : (
        <Entrar documento={user.documento} />
      )}
    </section>
  );
};
