import "./globals.css";
import ImageBildy from "./components/ImageBildy";
import ImageBg from "./components/ImageBg";

export const metadata = {
  title: "AlbaranPro",
  description: "Genera y gestiona albaranes y firmas digitales fácilmente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="body">
        <div className="background">
          <ImageBg />
        </div>
        <header className="header">
          <div className="logo">
            <ImageBildy />
          </div>
          <h1 className="title">AlbaranPro</h1>
          <p className="description">
            Genera y gestiona albaranes y firmas digitales fácilmente
          </p>
        </header>
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
