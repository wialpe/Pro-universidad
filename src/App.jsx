import Header from "./admin/components/Header"
import Aside from "./admin/components/Aside"
import Content from "./admin/components/Content"
import Footer from "./admin/components/Footer"
import { AppProvider } from "./context/AppContext"


function App() {
  return (
    <AppProvider>
      <div id="page-top">
        <div id="wrapper">
          {/* Sidebar fijo a la izquierda */}
          <Aside />

          {/* Contenido principal */}
          <div id="content-wrapper">
            {/* Topbar */}
            <Header />
            
            {/* Contenido de la página */}
            <div id="content">
              <div className="container-fluid">
                <Content />
              </div>
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

