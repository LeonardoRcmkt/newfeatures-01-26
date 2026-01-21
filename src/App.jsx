import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CookieModal } from "./Components/CookieModal.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Header } from "./Components/Header/Header.jsx";
import { ScrollToTop } from "./Components/ScrollToTop.jsx";
import { titlePages } from "./data/titlePages.js";
import { BannerIndustria } from "./Components/BannerIndustriaSwiper.jsx";
import { BtnCsat } from "./Components/BtnCsat.jsx"
import { Construct } from "./Components/Construct/Construct.jsx";
import { AppProvider } from "./data/AppContext.jsx";

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const pwdToken = "4102705";
  const startDate = new Date(2026, 0, 28, 0, 0, 0);

  const isInternalPage = [
    "/meus-cupons/",
    "/minhas-metas/",
    "/roleta/",
    "/meus-premios/",
    "/meus-dados/",
    "/alterar-senha/",
    "/cadastrar-cupons/",
    "/game/",
    "/ganhadores/",
    "/produtos-participantes/",
    "/redes-participantes/",
    "/duvidas/",
    "/contato/",
    "/login/",
    "/cadastrar/",
    "/precadastro/",
    "/excluir-dados/",
    "/recuperar-senha/",
  ].some((path) => location.pathname.startsWith(path));


  const isPrimaryPage = [
    "/game/", "/minhas-metas/", "/meus-premios/", "/meus-cupons/",
  ].some((path) => location.pathname.startsWith(path));

  const dateDay = startDate.getDate();
  const dateMonth = startDate.getMonth();
  const dateYear = startDate.getFullYear();
  const currentDate = new Date();

  useEffect(() => {
    const storedPwd = localStorage.getItem("pwd");
    if (storedPwd !== pwdToken) {
      const hostname = window.location.hostname;
      if (hostname.includes("rcmkt")
      || hostname.includes("localhost")
    )
      {
        localStorage.setItem("pwd", pwdToken);
        window.location.reload();
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const pwdParam = urlParams.get("pwd");
      if (pwdParam) {
        localStorage.setItem("pwd", pwdParam);
        if (pwdParam === pwdToken) {
          window.location.reload();
        }
      }
    }
  }, []);

  useEffect(() => {
    const currentPage = titlePages.find(
      (item) => item.path === location.pathname
    );
    if (currentPage?.title) {
      document.title = currentPage.title;
    }
  }, [location]);

  // useEffect(() => {
  //   if (isInternalPage && !isPrimaryPage) {
  //     document.body.id = "internal-page";
  //   } else {
  //     document.body.removeAttribute("id");
  //   }
  // }, [isInternalPage, isPrimaryPage]);

  if (localStorage.getItem("pwd") !== pwdToken && currentDate < startDate) {
    return <Construct targetDay={dateDay} targetMonth={dateMonth} targetYear={dateYear} />;
  }



  return (
    <>
      <AppProvider>
        <Header />
        <div className="flex flex-col-reverse">

                  <Footer />
        <ScrollToTop />
        <CookieModal />


        {isInternalPage ? (
          <>
            {token && <BtnCsat />}
            <main
              className={`min-h-screen   flex flex-col items-center pt-24 md:pt-36 pb-52 md:pb-14 px-4 md:px-14  ${!isPrimaryPage ? " bg-secondary shadow-none" : "bg-primary"
                }`}
            >
              {(location.pathname === "/meus-cupons/" ||
                location.pathname === "/produtos-participantes/") && <BannerIndustria />}
              <div className="flex gap-8 items-start w-full">

                <section className={`w-full ${token && "md:pt-8"}`}>
                  <Outlet />
                </section>
              </div>
            </main>
          </>
        ) : (
          <Outlet />
        )}

        </div>
      </AppProvider>
    </>
  );
}

export default App;
