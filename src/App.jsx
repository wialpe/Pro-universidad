import Header from "./admin/components/Header"
import Aside from "./admin/components/Aside"
import Content from "./admin/components/Content"
import Footer from "./admin/components/Footer"
import { AppProvider } from "./context/AppContext"


function App() {
  return (
    <AppProvider>
      <div id="page-top">
        <div id="wrapper" className="d-flex">
          {/* Sidebar a la izquierda */}
          <Aside />

          {/* Contenido principal */}
          <div id="content-wrapper" className="d-flex flex-column w-100">
            <div id="content" className="flex-grow-1">
              {/* Topbar */}
              <Header />
              {/* Contenido de la página */}
              <main className="container-fluid py-4">
                <Content />
              </main>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;

