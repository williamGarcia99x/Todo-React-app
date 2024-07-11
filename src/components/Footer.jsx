import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="mt-auto bg-[#004f83cd]">
      <div className="flex justify-center">
        <div className="translate-y-4 text-center text-gray-300 sm:translate-y-6">
          <p className="text-3xl sm:text-5xl"> My Todos</p>
          <em className="text-sm sm:text-lg">An App by William Garcia</em>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 pb-1 pr-4 text-white">
        <a
          href="https://www.linkedin.com/in/wgarcia99/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className="h-auto w-6 sm:w-10" icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/williamGarcia99x"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className="h-auto w-6 sm:w-10" icon={faGithub} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
