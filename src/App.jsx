import Header from "./admin/components/header"
import Aside from "./admin/components/Aside"
import Content from "./admin/components/content"
import Footer from "./admin/components/footer"


function App() {
  return (
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
  );
}

export default App;

