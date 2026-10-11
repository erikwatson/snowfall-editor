import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faJs, faNpm } from "@fortawesome/free-brands-svg-icons";
import "./heading.css";

type HeadingProps = {
  advanced: boolean;
};

const links = {
  snowfallGithub: "https://github.com/erikwatson/snowfall",
  reactSnowfallGithub: "https://github.com/erikwatson/react-snowfall",
  snowfallNpm: "https://www.npmjs.com/package/@erikwatson/snowfall",
  reactSnowfallNpm: "https://www.npmjs.com/package/@erikwatson/react-snowfall",
  jsdelivr: "https://www.jsdelivr.com/package/npm/@erikwatson/snowfall",
};

export const Heading = ({ advanced }: HeadingProps) => {
  return (
    <div className="heading">
      <h1>Snowfall :: stay cool ☃️</h1>

      <p>
        An{" "}
        <a href="https://erikwatson.me" target="_blank" rel="noreferrer">
          Erik Watson
        </a>{" "}
        project
      </p>

      <ul>
        <li>
          <a
            href={links.snowfallGithub}
            target="_blank"
            rel="noreferrer"
            aria-label="Snowfall on GitHub"
            title="Snowfall on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>Snowfall Editor on GitHub</span>
          </a>
        </li>

        <li>
          <a
            href={links.snowfallGithub}
            target="_blank"
            rel="noreferrer"
            aria-label="Snowfall on GitHub"
            title="Snowfall on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>Snowfall on GitHub</span>
          </a>
        </li>

        <li>
          <a
            href={links.reactSnowfallGithub}
            target="_blank"
            rel="noreferrer"
            aria-label="React Snowfall on GitHub"
            title="React Snowfall on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>React Snowfall on GitHub</span>
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <a
            href={links.snowfallNpm}
            target="_blank"
            rel="noreferrer"
            aria-label="Snowfall on npm"
            title="Snowfall on npm"
          >
            <FontAwesomeIcon icon={faNpm} />
            <span>Snowfall on NPM</span>
          </a>
        </li>

        <li>
          <a
            href={links.reactSnowfallNpm}
            target="_blank"
            rel="noreferrer"
            aria-label="React Snowfall on npm"
            title="React Snowfall on npm"
          >
            <FontAwesomeIcon icon={faNpm} />
            <span>React Snowfall on NPM</span>
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <a
            href={links.jsdelivr}
            target="_blank"
            rel="noreferrer"
            aria-label="JSDelivr page"
            title="JSDelivr"
          >
            <FontAwesomeIcon icon={faJs} />
            <span>Snowfall on JSDelivr</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
