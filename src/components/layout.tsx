import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {

  return (
    <div className="bg-gradient-to-br from background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-12 py-8">{children}</main>
      <footer className="backdrop-blur py-4">
        <div className="container mx-auto px-4 text-center text-gray-500">Made with 😀 by creativity inside</div>
      </footer>
    </div>
  );
};

export default Layout;
