import React from "react";

export const Footer = () => {
  return (
    <footer className={"text-center text-gray-500 text-xs"}>
      &copy; {new Date().getFullYear()} - <a href={"https://thierryparlier.netify.app"}>Parlier Thierry</a> -{" "}
      <a className={"p-1"} href={"https://github.com/Angra974/vite-ssr-typescript-react-node"}>
        Repo
      </a>
    </footer>
  );
};
