import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-base-100 text-base-content text-center footer footer-center my-8">
      <aside>
        <hr className="w-full h-1 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <p className="text-base">
          Give me a star on github if you liked using this so I know to create
          more cool stuff:{" "}
          <a
            className="text-decoration-line: underline text-blue-500"
            href="https://github.com/pkkhvu/fitkevin"
          >
            https://github.com/pkkhvu/fitkevin
          </a>
          <br />
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
