import { Button } from "../Button";
import { BtnCsat } from "../BtnCsat";

export const BtnFloatingHomepage = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <BtnCsat className=" md:hidden flex !bottom-[6.5rem] !right-2 !text-xs "/>}
      <div className="mix-blend-hue bg-menu h-20 fixed left-[2.5vw] bottom-4 z-[37] w-[95vw] rounded-xl"></div>
      <div className="bg-secondary-gradient-radius mix-blend-luminosity h-20 fixed left-[2.5vw] bottom-4 z-[38] w-[95vw] rounded-xl"></div>
      <div
        className="left-[2.5vw] w-[95vw] fixed bottom-4 h-20 z-[39] border-4 border-background rounded-xl"
        style={{
          boxShadow:
            "0 0 0 4px rgba(53, 28, 92), var(--shadow-dark-md) !important",
        }}
      >
        <div className="w-full h-full flex justify-end md:justify-between items-center pr-6">
          <img
            className="absolute w-32 left-6 md:left-8 lg:w-56 bottom-0 drop-shadow-2xl"
            src="/images/vic_apontando_1.webp"
            alt="Festao"
          />

          <Button
            className="w-1/2 sm:w-fit !justify-self-center mx-center !ml-[45%] "
            variant="primary"
            tone="positive"
            link={token ? "/game/" : "/login/?utm_source=mc-25-btn2-flutuante"}
            title={token ? "JOGAR" : "CADASTRAR"}
            target='_self'
          />
          {token && <BtnCsat className="!static hidden md:flex "/>}
        </div>
      </div>
    </>
  );
};
